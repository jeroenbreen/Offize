({
    baseUrl: "frontend/",
    mainConfigFile: "frontend/browserConfig.js",
    paths: {
        'requireLib': 'bower_components/requirejs/require'
    },
    include: ['requireLib'],
    optimize: "uglify2",
    removeCombined: true,
    name: "main",
    out: 'build/innouveau-office-v1.0-build5-min.js'
})