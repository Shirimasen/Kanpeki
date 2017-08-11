let mix = require('laravel-mix');

mix.js('js/kanpeki.js', 'dist');
mix.sass('scss/kanpeki.scss', 'dist', {
	outputStyle: 'expanded',
	precision: 6
});

mix.disableNotifications();
mix.options({
	processCssUrls: false
});
