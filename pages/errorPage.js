module.exports = (data) => `
    <!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>404 - Not Found</title>
        </head>
        <body>
            <h1>Houston, We have a problem.</h1>

            <section>
                <p>Something is wrong. Please, try again later.</p>
            </section>

            <br />

            <div>
                <p>Error: </p>
                <code style="background-color: crimson; color: white;">
                    ${data}
                </code>
            </div>
        </body>
    </html>
`;
