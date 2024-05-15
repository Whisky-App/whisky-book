BASENAME=`basename $PWD`

if [[ $BASENAME == "whisky-book" ]]; then

    # get args
    ARGS=$1

    if [[ $ARGS == "-i" ]]; then
        # install preprocessors
        cargo install mdbook mdbook-alerts mdbook-template mdbook-last-changed
    fi

    # generate sidebar
    ./scripts/generate.mjs

    # check linting
    ./scripts/lint.mjs

    # open book
    mdbook serve --open

else
    echo "Improper directory! Please execute this script from the root of the whisky-book directory."
fi