
// wait for the dom to load before setting the handling
document.addEventListener('DOMContentLoaded', function () {

    /**
     *  Helper function to shove the left page into view.
     */
    function showLeft() {

        document.querySelector('.frame').classList.remove('right');
        document.querySelector('.frame').classList.add('left');
    }

    /**
     *  Helper function to shove the right pane into view.
     */
    function showRight() {

        document.querySelector('.frame').classList.remove('left');
        document.querySelector('.frame').classList.add('right');
    }

    // install handling for the button to show the left side
    document.querySelector('[data-action="show-left"]').addEventListener('click', showLeft);

    // install handling for the button to show the right side
    document.querySelector('[data-action="show-right"]').addEventListener('click', showRight);

    // a variable to recod
    let position = null;

    // install handling for a touch start
    document.addEventListener('touchstart', event => {

        // get the touch
        let touch = event.touches.item(0);

        // remember the position for the touchend
        position = { x: touch.screenX, y: touch.screenY };
    });

    // install a touchend so that we can check if we have a certan gesture. We want
    // to look at gesture that do this slight left/right swipe. It means that
    // there should be move of left/right movement rather than up/bottom.
    document.addEventListener('touchend', event => {

        // get the touch
        let touch = event.changedTouches.item(0);

        // compute the height-axis difference
        const hDiff = Math.abs(position.y - touch.screenY);

        // compute the width-axis difference
        const wDiff = position.x - touch.screenX;

        document.querySelector('.target').textContent = wDiff + ' x ' + hDiff;

        // not a vertical movement? then skip it
        if (hDiff > 75) return;

        // more than 150 px off? then we want to swipe right
        if (wDiff > 200) showRight();

        // less than -150 px off? then we want to swipe left
        if (wDiff < -200) showLeft();

    });
});
