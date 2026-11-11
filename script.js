
// FEE CALCULATOR

var feeForm = document.getElementById("feeForm");

if (feeForm) {

    var activity = document.getElementById("activity");
    var people = document.getElementById("people");
    var tripDate = document.getElementById("tripDate");

    // Function to calculate the fees
    function calculateFees() {

        var numberOfPeople = Number(people.value);
        var activityPrice = Number(activity.value);

        if (numberOfPeople < 1 || numberOfPeople > 30 ||
            isNaN(numberOfPeople)) {

            document.getElementById("feeMessage").textContent =
                "Please enter between 1 and 30 people.";

            return false;
        }

        // Calculate extra services
        var extras = 0;

        if (document.getElementById("equipment").checked) {
            extras = extras + 150;
        }

        if (document.getElementById("meal").checked) {
            extras = extras + 120;
        }

        if (document.getElementById("transport").checked) {
            extras = extras + 250;
        }

        // Calculate totals
        var activityTotal = activityPrice * numberOfPeople;
        var extrasTotal = extras * numberOfPeople;

        var subTotal = activityTotal + extrasTotal;
        var bookingFee = subTotal * 0.05;
        var total = subTotal + bookingFee;

        // Display the results
        document.getElementById("activityCost").textContent =
            "R" + activityTotal.toFixed(2);

        document.getElementById("personCount").textContent =
            numberOfPeople;

        document.getElementById("extraCost").textContent =
            "R" + extrasTotal.toFixed(2);

        document.getElementById("bookingCost").textContent =
            "R" + bookingFee.toFixed(2);

        document.getElementById("totalCost").textContent =
            "R" + total.toFixed(2);

        return true;
    }

    // Calculate when the button is clicked
    feeForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (calculateFees()) {
            document.getElementById("feeMessage").textContent =
                "Your fees have been calculated successfully!";
        }

    });

    // Update the total when the visitor changes their choices
    activity.addEventListener("change", calculateFees);
    people.addEventListener("input", calculateFees);

    document.getElementById("equipment").addEventListener(
        "change", calculateFees
    );

    document.getElementById("meal").addEventListener(
        "change", calculateFees
    );

    document.getElementById("transport").addEventListener(
        "change", calculateFees
    );

    // Set today's date as the earliest booking date
    var today = new Date();

    var dateText = today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

    tripDate.min = dateText;

    // Continue to the contact page
    document.getElementById("continueButton").addEventListener(
        "click", function() {

            if (tripDate.value === "") {
                alert("Please select your trip date.");
                tripDate.focus();
                return;
            }

            if (tripDate.value < dateText) {
                alert("Please select a future date.");
                return;
            }

            if (calculateFees()) {

                var details = new URLSearchParams();

                details.set("activity",
                    activity.options[activity.selectedIndex].text);

                details.set("date", tripDate.value);
                details.set("people", people.value);

                details.set("total",
                    document.getElementById("totalCost").textContent);

                window.location.href =
                    "contact.html?" + details.toString();
            }
        }
    );

    // Display the first calculation
    calculateFees();
}
