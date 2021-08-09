const chartData = {};
window.addEventListener("load", function() {
    const params = {}
    let activeTab = 1;
    //get chart data
    function getChartData (intervalInDay, params) {
        const url = `http://localhost:5000/mock/${intervalInDay}.json${Object.keys(params).length ? '?' : ''}${new URLSearchParams(params)}`;
        // const url = `http://localhost:443/api/getAvgResponse/${intervalInDay}${Object.keys(params).length ? '?' : ''}${new URLSearchParams(params)}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            chartData[intervalInDay] = data;
            intiateChartRender(intervalInDay);
            getDRChartData(intervalInDay);
        });
    }
    //fetch default chart data on load
    getChartData(activeTab, params);
    
	// store tabs variable
	var myTabs = document.querySelectorAll("div.nav-tabs > .nav-item");
  function myTabClicks(tabClickEvent) {
		for (var i = 0; i < myTabs.length; i++) {
			myTabs[i].classList.remove("active");
		}
        var clickedTab = tabClickEvent.currentTarget;
		clickedTab.classList.add("active");
		tabClickEvent.preventDefault();
		var myContentPanes = document.querySelectorAll(".tab-pane");
		for (i = 0; i < myContentPanes.length; i++) {
            myContentPanes[i].classList.remove("active");
		}
        var anchorReference = tabClickEvent.target;
        activeTab =  anchorReference.getAttribute('data-day');
		var activePaneId = anchorReference.getAttribute("href");
		var activePane = document.querySelector(activePaneId);
        activePane.classList.add("active");
        getChartData(activeTab, params);
	}
	for (i = 0; i < myTabs.length; i++) {
		myTabs[i].addEventListener("click", myTabClicks)
    }
    var stateOption = document.getElementById('stateOption');
    var productType = document.getElementById('productType');
    var tenantId = document.getElementById('tenantId');
    var submitBtn = document.getElementById('submitBtn');
    function onStateChange() {
        updateParamsValue('State', this.value)
    }
    function onProductTypeChange() {
        updateParamsValue('ProductType', this.value)
    }
    function onTenantIdChange() {
        updateParamsValue('TenantId', this.value)
    }
    function updateParamsValue(key, value) {
        if(value === "-1") {
            delete params[key]
        } else {
            params[key]= value;
        }
    }

    stateOption.addEventListener("change", onStateChange);
    productType.addEventListener("change", onProductTypeChange);
    tenantId.addEventListener("change", onTenantIdChange);
    submitBtn.addEventListener("click", () => {
        getChartData(activeTab, params);
    });
    
});
