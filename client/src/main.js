
(() => {
    console.log('hee :D')

    

    // UTA coords
    // "3328662.500000,6825009.000000"
    const UTAcoords = '3328662.500000,6825009.000000';

    // TUT coords
    // "3332742.500000,6819846.000000"
    const TUTcoords = '3332742.500000,6819846.000000';

    // TAMK coords
    // "3330355.500000,6826018.000000"
    const TAMKcoords = '3330355.500000,6826018.000000';


    fetch('route', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'startCoords': UTAcoords,
            'destCoords': TUTcoords
        })
    }).then(res => {
        if (res.ok) { return res.json() }
        else { throw Error('error in client promise') }

    }).then(res => {
        if (res.error) {
            alert(res.error);
        } else {
            console.log(res);
        }

    })


})();
