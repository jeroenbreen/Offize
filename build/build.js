({
    baseUrl: "../dev/frontend/",
    mainConfigFile: "../dev/frontend/browserConfig.js",
    paths: {
        'requireLib': 'bower_components/requirejs/require'
    },
    include: ['requireLib'],
    optimize: "uglify2",
    removeCombined: true,
    name: "main",
    out: '../live/innouveau-office-v1.1-build2-min.js'
})