const comparison = (a, b) => {
    return (
        a.title === b.title && 
        a.price === b.price && 
        a.link === b.link &&
        a.returns === b.returns &&
        a.type === b.type &&
        a.address === b.address
    )
}

module.exports = comparison
module.exports.comparison = comparison