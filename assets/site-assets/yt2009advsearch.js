var advSearchOpened = false;
function toggleAdvSearch() {
    advSearchOpened = !advSearchOpened
    if(advSearchOpened) {
        document.getElementById("search-advanced-form").className = ""
    } else {
        document.getElementById("search-advanced-form").className = "hid"
    }
}

function sendAdvSearch() {
    var urlAdded = ""
    // check for each option
    // textboxes
    var all_words = document.getElementById("input-all-words").value
    if(all_words) {
        urlAdded += all_words.split(" ").join("+")
    }
    var exact_phrase = document.getElementById("input-exact").value
    if(exact_phrase) {
        urlAdded += "+\"" + exact_phrase.split(" ").join("+") + "\""
    }
    var one_or_more = document.getElementById("input-one-or-more").value
    if(one_or_more) {
        urlAdded += "+(" + one_or_more.split(" ").join("+OR+") + ")"
    }
    var none = document.getElementById("input-none").value
    if(none) {
        urlAdded += "+-" + none.split(" ").join("+-")
    }
    // type of results
    var checkedType;
    var checkedFeatures = []
    var inputs = document.getElementById("panel2").getElementsByTagName("input")
    for(var input in inputs) {
        input = inputs[input]
        if(input.nodeName
        && input.getAttribute("type") == "radio"
        && input.checked) {
            checkedType = input;
        }
        if(input.nodeName
        && input.getAttribute("type") == "checkbox"
        && input.checked) {
            checkedFeatures.push(input)
        }
    }
    for(var feature in checkedFeatures) {
        urlAdded += "&" + checkedFeatures[feature].getAttribute("name") + "=1"
    }
    if(checkedType && checkedType.id !== "radio-all") {
        urlAdded += "&search_type=search_" + checkedType.id.replace("radio-", "")
    }

    // duration
    var selectedDuration = false
    var durations = document.getElementById("select-duration")
                            .getElementsByTagName("option")
    for(var duration in durations) {
        if(durations[duration] && durations[duration].selected) {
            selectedDuration = durations[duration]
        }
    }
    if(selectedDuration.getAttribute("name")
    && selectedDuration.getAttribute("name") !== "anytime") {
        urlAdded += "&search_duration=" + selectedDuration.getAttribute("name")
    }

    // upload time
    var selectedTime = false
    var times = document.getElementById("select-uploaded")
                        .getElementsByTagName("option")
    for(var time in times) {
        if(times[time] && times[time].selected) {
            selectedTime = times[time]
        }
    }
    if(selectedTime.getAttribute("name")
    && selectedTime.getAttribute("name") !== "anytime") {
        urlAdded += "&uploaded=" + selectedTime.getAttribute("name")
    }

    // send!!
    location.href = YT2009_BASE_SEARCH_URL + urlAdded
}