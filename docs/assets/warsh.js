var warsh = {
        id: 0,
        HTMLclass: 'rawi',

        text: {
            name: 'ورش',
        },
    },
    abo_yaaqoob_alazraq = {
        id: 1,
        parent: warsh.id,
        text: {
            name: 'ابو يعقوب الأزرق',
        },
    },
    alasbahany = {
        id: 2,
        parent: warsh.id,
        text: {
            name: 'محمد الأصبهاني',
        },
    },
    chart_config = [
        warsh,
        abo_yaaqoob_alazraq,
        alasbahany,
    ];

export default chart_config;
