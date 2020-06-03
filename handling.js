
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

    /**
     *  Helper function to show the middle content into view.
     */
    function showMiddle() {

        document.querySelector('.frame').classList.remove('left');
        document.querySelector('.frame').classList.remove('right');
    }

    /**
     *  Move the context left. If the right sidepanel is shown we will show
     *  the middle if not then the left sidebar.
     */
    function moveLeft() {

        if (document.querySelector('.frame').classList.contains('right')) showMiddle();
        else showLeft();
    }

    /**
     *  Move the context right. If the left sidepanel is shown we will show
     *  the middle if not then the right sidebar.
     */
    function moveRight() {

        if (document.querySelector('.frame').classList.contains('left')) showMiddle();
        else showRight();
    }

    // install handling for the button to show the left side
    document.querySelector('.frame-left .frame-button').addEventListener('click', showLeft);

    // install handling for the button to show the right side
    document.querySelector('.frame-right .frame-button').addEventListener('click', showRight);

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

        // not a vertical movement? then skip it
        if (hDiff > 50) return;

        // more than 100 px off? then we want to swipe right
        if (wDiff > 100) moveRight();

        // less than -100 px off? then we want to swipe left
        if (wDiff < -100) moveLeft();

    });
});
