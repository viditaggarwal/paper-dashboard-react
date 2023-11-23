
function getRatingValue(score) {
    let ratingValue = score / 20;
    return Math.min(Math.ceil(ratingValue * 2) / 2, 5);
}
  
function getRatingClass(score) {
    const ratings = {
        1: 'rating-1',
        1.5: 'rating-1-5',
        2: 'rating-2',
        2.5: 'rating-2-5',
        3: 'rating-3',
        3.5: 'rating-3-5',
        4: 'rating-4',
        4.5: 'rating-4-5',
        5: 'rating-5',
    };
    let ratingValue = getRatingValue(score);
    return ratings[ratingValue] || 'rating-1';
}

module.exports = {
    getRatingValue,
    getRatingClass
};
