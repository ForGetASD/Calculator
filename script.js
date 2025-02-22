let totalCountArray = [];
let totalCount = 0;
let activeOperator = false;
let newNum = true;
let eredmeny = false;

$(document).ready(() => {
    reset();
    kijelzoShowLogic();
    plusMinusLogic();
    operatorLogic();
    eredmenyLogic();
});

function reset() {
    $("#reset").on("click", resetLogic);
}

function resetLogic() {
    $("#kijelzo").val("");

    $("button[id*='operator']").each(function () {
        console.log($(this));
        $(this).css("background-color", "lightgrey");
    });

    totalCountArray = [];
    totalCount = 0;
    activeOperator = false;
    newNum = true;
    eredmeny = false;
}

function kijelzoShowLogic() {
    $("button[id*='num'").on("click", () => {
        if (eredmeny) {
            resetLogic();
        }
        if (activeOperator) {
            $("#kijelzo").val($(event.target).html());
            activeOperator = false;
        } else {
            $("#kijelzo").val($("#kijelzo").val() + $(event.target).html());
        }
    });
}

function plusMinusLogic() {
    let windowVal = $("#kijelzo");
    $("#plusOrMinus").on("click", () => {
        if (windowVal.val()[0] == "-") {
            windowVal.val(windowVal.val().substr(1));
        } else {
            windowVal.val("-" + windowVal.val());
        }
    });
}

function operatorLogic() {
    $("button[id*='operator']").on("click", () => {
        if ($("#kijelzo").val() != "") {
            activeOperator = true;
            $(event.target).css("background-color", "grey");
            totalCountArray.push($("#kijelzo").val());
            totalCountArray.push($(event.target).html());
            $("#kijelzo").val();

            $("button[id*='operator'")
                .not(event.target)
                .each(function () {
                    $(this).css("background-color", "lightgrey");
                });
        }
    });
}

function eredmenyLogic() {
    $("#eredmeny").on("click", () => {
        eredmeny = true;
        totalCountArray.push($("#kijelzo").val());
        totalCountArray.push("=");
        countLogic();
    });
}

function countLogic() {
    let tempArray = [];
    $.each(totalCountArray, (key, value) => {
        if (tempArray.length != 3) {
            tempArray.push(value);
        }
        if (tempArray.length == 3) {
            let returnVal = numberLogic(tempArray);
            tempArray = [];
            tempArray.push(returnVal);
        }
        if (value == "=") {
            totalCount = tempArray[0];
            $("#kijelzo").val(totalCount);
        }
    });
}

function numberLogic(data) {
    let val = 0;
    switch (data[1]) {
        case "+":
            val = parseFloat(data[0]) + parseFloat(data[2]);
            break;
        case "-":
            val = parseFloat(data[0]) - parseFloat(data[2]);
            break;
        case "*":
            val = parseFloat(data[0]) * parseFloat(data[2]);
            break;
        case "/":
            val = parseFloat(data[0]) / parseFloat(data[2]);
            break;
    }

    return val;
}
