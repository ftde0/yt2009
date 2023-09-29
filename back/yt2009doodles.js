/*
yt2009 doodles

property names inside of doodles variable are mm-dd!!
*/
const doodles = {
    "2-1": "/assets/site-assets/doodles/logo-superbowl.png",
    "2-14": "/assets/site-assets/doodles/logo-valentinesday.png",
    "3-13": "/assets/site-assets/doodles/logo-clownnose.png",
    "3-17": "/assets/site-assets/doodles/logo-remade-stpats.png",
    "4-15": "/assets/site-assets/doodles/logo_symphony.png",
    "5-16": "/assets/site-assets/doodles/logo_eurovision.png",
    "6-12": "/assets/site-assets/doodles/logo_analog_off.gif",
    "7-4": "/assets/site-assets/doodles/logo_july4th.png",
    "7-20": "/assets/site-assets/doodles/logo_lunar.png",
    "10-9": "/assets/site-assets/doodles/logo_holy_crap_1bn_a_day-vfl124472.png",
    "10-12": "/assets/site-assets/doodles/logo-german-election-vfl122998.png",
    "10-31": "/assets/site-assets/doodles/logo_halloween-vfl129017.png",
    "11-17": "/assets/site-assets/doodles/logo-custom-nov17.png",
    "christmas": "/assets/site-assets/doodles/logo_solstice-vfl138400.png"
}

const replacableCodes = [
    `<button id="logo" class="master-sprite"></button>`,
    `<button id="logo" class="master-sprite" title=""></button>`,
    `<button id="logo" class="master-sprite" title="" onclick="window.top.location.href='/'; return false;"></button>`,
]

module.exports = {
    "getDoodle": function() {
        let d = new Date()
        let date = (d.getMonth() + 1) + "-" + d.getDate()
        if(d.getMonth() == 11 && (d.getDate() >= 21 && d.getDate() <= 25)) {
            date = "christmas"
        }

        return doodles[date] || false;
    },

    "applyDoodle": function(code) {
        if(this.getDoodle()) {
            let d = this.getDoodle()
            let dc = `<img id="logo" src="${d}" style="width: auto;height: auto;"/>`
            replacableCodes.forEach(c => {
                code = code.replace(c, dc)
            })
        }

        return code;
        
    }
}