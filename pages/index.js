module.exports = ({name, origin, description, wikipedia_url, imageUrl}) => `
    <!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>${name}</title>
        </head>
        <body>
            <h1>${name}</h1>
            <figure>
                <img src="${imageUrl}" alt="${name}" />
                <figcaption>
                    ${description}
                </figcaption>
            </figure>
            <p>Origin: ${origin} </p>
            <p>Information from ${wikipedia_url}</p>
        </body>
    </html>
`;
