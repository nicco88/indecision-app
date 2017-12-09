exports.files = {
    javascripts: {
        joinTo: {
            'js/app.js': /^(app\/|app\/js)/,
            'js/vendor.js': /^node_modules/
        }
    },
    stylesheets: {
        joinTo: {
            'styles/app.css': 'app/styles/**/*.css'
        }
    }
};

exports.plugins = {
    babel: {presets: ['env', 'react']},
    postcss: {
        processors: [
            require('postcss-import')(),
            require('postcss-cssnext')()
        ]
    }
};

exports.modules = {
    autoRequire: {
        'js/app.js': ['js/initialize.js']
    }
};