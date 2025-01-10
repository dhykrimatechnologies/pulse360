export interface topcard {
    bgcolor: string,
    icon: string,
    title: string,
    subtitle: string
}

export const topcards: topcard[] = [

    {
        bgcolor: 'success',
        icon: 'bi bi-wallet',
        title: '485',
        subtitle: 'No of Tenants'
    },
    {
        bgcolor: 'danger',
        icon: 'bi bi-coin',
        title: '$3,248 K',
        subtitle: 'Invoiced Amount YTD'
    },
    {
        bgcolor: 'warning',
        icon: 'bi bi-basket3',
        title: '$160 K',
        subtitle: 'Azure Cost YTD'
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-bag',
        title: '388',
        subtitle: 'Target Tenants'
    },

]
