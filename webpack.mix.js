let mix = require('laravel-mix');

mix.disableNotifications();
mix.options({
	processCssUrls: false
});

mix.js('js/kanpeki.js', 'dist');
mix.sass('scss/kanpeki.scss', 'dist', {
	outputStyle: 'expanded',
	precision: 6
});
