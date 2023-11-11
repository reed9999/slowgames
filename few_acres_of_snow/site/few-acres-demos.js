// Use this file for example JS that can be pasted into e.g. Chrome's Developer Tools.


function ShowPJRInfo(n, t, i, r, popupHeight=480, slowness=300) {
    (
        $("#cardInfoDiv").html(""), n !== 7 ? $("#cardInfoDiv").html(CreateCardInfo(n, t, i, r)) : $("#cardInfoDiv").html(CreatePointsInfo(t)), cardInfoVisible) || (cardInfoVisible = !0, $("#cardInfoDiv").animate(
        {
            // At 50, barely pops up. Unclear how this works though; if the number is too low, it seems
            // like the first setting sticks, perhaps. We should disallow very low settings so the window doesn't get stuck.
            top: "-=" + popupHeight
        },
        slowness,
        function () {
        }))
}


