import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import CropFreeIcon from "@mui/icons-material/CropFree";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; // Arrow for submenu
import { ChartHeadingProps } from "../types";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import CloseIcon from "@mui/icons-material/Close";
import FeatureAccessControl from "../../../authorization/feature.access.control";
import userAccess from "../../../authorization/user.access.constants";

const ChartHeading = ({
  title,
  onExpandIconClick,
  FilterComponent,
  chartRef,
  exportOptions = [],
  enalbeEditDashboard,
  onComponentDelete = () => {},
  componentIndex,
}: ChartHeadingProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleConfigIconClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget); // Open the config menu
  };

  const handleExportMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setExportAnchorEl(event.currentTarget); // Open Export submenu
  };

  const stringifyStylesheet = (stylesheet: any) =>
    stylesheet.cssRules
      ? Array.from(stylesheet.cssRules)
          .map((rule: any) => rule.cssText || "")
          .join("\n")
      : "";

  const getStyles = () =>
    Array.from(document.styleSheets)
      .map((s) => stringifyStylesheet(s))
      .join("\n");

  const getDefs = () => {
    const styles = getStyles();

    return `<defs><style type=\"text/css\"><![CDATA[${styles}}]]></style></defs>`;
  };

  const download = (format: "PNG" | "JPG" | "PDF") => {
    const svgElems = chartRef?.current.querySelectorAll(
      'svg[class$="MuiChartsSurface-root"]'
    );

    if (!svgElems || svgElems?.length === 0) {
      console.log("No svg chart found in container");
      return;
    }

    const svgElem = svgElems[0];

    // Adding styles to the SVG
    const defs = getDefs();
    svgElem.insertAdjacentHTML("afterbegin", defs);

    const output = {
      name: `chart.${format.toLowerCase()}`,
      width: svgElem.clientWidth,
      height: svgElem.clientHeight,
    };

    const uriData = `data:image/svg+xml;base64,${btoa(
      new XMLSerializer().serializeToString(svgElem)
    )}`;
    const img = new Image();
    img.src = uriData;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      [canvas.width, canvas.height] = [output.width, output.height];

      const ctx: any = canvas.getContext("2d");

      // Apply white background only for JPG and PDF export
      if (format === "JPG" || format === "PDF") {
        ctx.fillStyle = "white"; // Set the background to white
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill canvas with white color
      }

      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0, output.width, output.height);

      // Prepare for download
      const a = document.createElement("a");
      const quality = 1.0; // Can be adjusted for JPEG quality

      if (format === "PNG") {
        a.href = canvas.toDataURL("image/png", quality); // PNG format
      } else if (format === "JPG") {
        a.href = canvas.toDataURL("image/jpeg", quality); // JPEG format
      } else if (format === "PDF") {
        // For PDF, use jsPDF to generate the document
        const doc = new jsPDF();

        // Get the page width and height of PDF
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        // Calculate the scale factor to fit the chart within the PDF page
        const scaleFactor = Math.min(
          pageWidth / output.width,
          pageHeight / output.height
        );

        // Calculate the new scaled width and height to fit within the page
        const scaledWidth = output.width * scaleFactor;
        const scaledHeight = output.height * scaleFactor;

        // Add a white background for the PDF page
        doc.setFillColor(255, 255, 255); // White background
        doc.rect(0, 0, pageWidth, pageHeight, "F");

        // Add the image to the PDF, scaled to fit within the page
        doc.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          0,
          scaledWidth,
          scaledHeight
        );

        // Save the PDF
        doc.save("energy-consumption-chart.pdf");
        return;
      }

      // Download the image (PNG or JPG)
      a.download = output.name;
      a.append(canvas);
      a.click();
      a.remove();
    };

    resetAnchors();
  };

  const resetAnchors = () => {
    setAnchorEl(null); // Close the main menu
    setExportAnchorEl(null); // Close the export submenu
    setFilterAnchorEl(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      anchorEl &&
      !anchorEl.contains(event.target as Node) &&
      exportAnchorEl &&
      !exportAnchorEl.contains(event.target as Node)
    ) {
      resetAnchors();
    }
  };

  const handleFiltersOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
      <Typography
        component={"h2"}
        sx={{ marginRight: "10px", fontSize: "16px", flex: 1 }}
      >
        {title}
      </Typography>
      {enalbeEditDashboard ? (
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="expand chart"
          onClick={() => {
            console.log("called once");
            onComponentDelete(componentIndex);
          }}
          sx={{
            height: "16px",
            width: "16px",
            marginRight: "5px",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : (
        <Box display="flex" flexWrap="nowrap" gap="10px">
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="expand chart"
            onClick={onExpandIconClick}
            sx={{
              height: "16px",
              width: "16px",
              marginRight: "5px",
            }}
          >
            <CropFreeIcon />
          </IconButton>
          <FeatureAccessControl requiredRoles={[...userAccess.EXPORT_REPORTS]}>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="open config menu"
              onClick={handleConfigIconClick}
              sx={{
                height: "16px",
                width: "16px",
                marginRight: "5px",
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </FeatureAccessControl>
        </Box>
      )}
      {/* Main Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {/* Export Menu */}
        <MenuItem onClick={handleExportMenuOpen}>
          <Typography variant="body2">Export as</Typography>
          <KeyboardArrowDownIcon sx={{ ml: 1 }} /> {/* Arrow for submenu */}
        </MenuItem>

        {/* Submenu for Export Options */}
        <Menu
          anchorEl={exportAnchorEl}
          open={Boolean(exportAnchorEl)}
          onClose={() => resetAnchors()}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {exportOptions?.map((option: any) => (
            <MenuItem onClick={() => download(option)} key={option}>
              <Typography variant="body2">{option}</Typography>
            </MenuItem>
          ))}
        </Menu>

        {/* Filter Menu */}
        {FilterComponent && (
          <>
            <MenuItem onClick={handleFiltersOpen}>
              <Typography variant="body2">Filters</Typography>
            </MenuItem>
            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={() => resetAnchors()}
            >
              <FilterComponent />
            </Menu>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default ChartHeading;
