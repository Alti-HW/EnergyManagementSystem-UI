export const filterDetails = [
    {
        label: 'CNTC Presidential Tower',
        value: 'CN',
    },
    {
        label: 'Mantri DSK Pinnacle',
        value: 'MD',
    },
    {
        label: 'Brigade Exotica 1',
        value: 'BE',
    },
    {
        label: 'SNN Clermont 2',
        value: 'SN',
    },
    {
        label: 'Pashmina Waterfront Tower 1',
        value: 'PW',
    }
]
export const mockFloors = [
    {
        label: '1',
        value: '1',
    },
    {
        label: '2',
        value: '2',
    },
    {
        label: '3',
        value: '3',
    },
    {
        label: '4',
        value: '4',
    },
    {
        label: '5',
        value: '5',
    },
    {
        label: '6',
        value: '6',
    },
    {
        label: '7',
        value: '7',
    },
    {
        label: '8',
        value: '8',
    }]

export const filters = [
    {
        filterType: 'date',
        filterName: 'Date',
        filterId: 'date'
    },
    {
        filterType: 'select',
        filterName: 'Building Name',
        filterId: 'buildingName',
        data: filterDetails,
    },
    {
        filterType: 'select',
        filterName: 'Floor number',
        filterId: 'floorNumber',
        data: mockFloors,
    }
]