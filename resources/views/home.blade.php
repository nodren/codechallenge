<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>LiteracyPro Code Sample</title>
        <style>
            a {
                color: #ff4081;
                text-decoration: none;
            }

            a:hover {
                text-decoration: underline;
            }

            html {
                font-family: 'Roboto', sans-serif;
                -webkit-font-smoothing: antialiased;
            }

            body, h1, h2, h3, h4, h5, h6 {
                margin: 0;
            }

            body {
                font-size: 15px;
                line-height: 24px;
                background-color: #EEE;
            }
        </style>
    </head>
    <body>
        <div id="app"></div>
        <script>
            window.Laravel = {!! json_encode(['csrfToken' => csrf_token()]) !!};
        </script>
        <script type="text/javascript" src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
