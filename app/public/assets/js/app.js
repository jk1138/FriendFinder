$(".submit-button").on("click", function () {

    //Form validation
    function validate() {
        var valid = true;
        $(".form-control").each(function () {
            if ($(this).val() === "") {
                valid = false;
            }
        });
        $(".chosen-select").each(function () {
            if ($(this).val() === "") {
                valid = false;
            }
        });
        return valid
    };

    if (validate()) {
        var userData = {
            name: $("#user_name").val().trim(),
            photo: $("#user_photo").val().trim(),
            scores: [
                $("#q1").val(),
                $("#q2").val(),
                $("#q3").val(),
                $("#q4").val(),
                $("#q5").val(),
                $("#q6").val(),
                $("#q7").val(),
                $("#q8").val(),
                $("#q9").val(),
                $("#q10").val()
            ]
        };

        var currentURL = window.location.origin;

        $.post(currentURL + "/api/friends", userData, function (data) {
            $("#character-name").html(data.name)
            $("#modal-image").attr("src", data.photo)
            $("#friend_name").val("");
            $("#friend_image").val("");
        });

        $("#friend-modal").modal("show");

    } else {
        $("#invalid-modal").modal("show");
    }
});

$(".fan-match").on("click", function () {
    var currentURL = window.location.origin;
    $.ajax({
        url: currentURL + "/api/friends",
        method: "GET",
    }).then(function (response) {

        //Removes object just entered
        response.pop();

        var userData = {
            name: $("#user_name").val().trim(),
            photo: $("#user_photo").val().trim(),
            scores: [
                $("#q1").val(),
                $("#q2").val(),
                $("#q3").val(),
                $("#q4").val(),
                $("#q5").val(),
                $("#q6").val(),
                $("#q7").val(),
                $("#q8").val(),
                $("#q9").val(),
                $("#q10").val()
            ]
        };

        var scoreDifference = 0;

        var bestFanMatch = {
            name: "",
            photo: "",
            friendDifference: 100
        }

        //Loop through array of friends
        for (var i = 0; i < response.length; i++) {

            //Reset the score difference to 0 for each friend we loop through
            scoreDifference = 0;

            //Loop through each friend's array of scores
            for (var j = 0; j < response[i].scores.length; j++) {

                //Calculate the score difference between each user score and each friend score
                scoreDifference += Math.abs(parseInt(userData.scores[j]) - parseInt(response[i].scores[
                    j]));
            };

            //Check if the score difference is less than the current best match in the loop
            if (scoreDifference < bestFanMatch.friendDifference) {
                bestFanMatch.name = response[i].name,
                    bestFanMatch.photo = response[i].photo,
                    bestFanMatch.friendDifference = scoreDifference
            };
        };

        $("#fan-name").html(bestFanMatch.name)
        $("#fan-modal-image").attr("src", bestFanMatch.photo)
        $("#fan-modal").modal("show");
    })
})