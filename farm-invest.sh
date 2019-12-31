#!/bin/bash

FARM_INVEST="$(farm-invest-cli)"

if [[ "$FARM_INVEST" != "" && "$FARM_INVEST" != "[]" ]]
then
    OUTPUT="> farm-invest-cli report\n\n$FARM_INVEST"
    echo "$OUTPUT"
    # telegram "$OUTPUT"
fi