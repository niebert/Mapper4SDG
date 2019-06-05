/**
* Extend object 'a' with the properties of object 'b'.
* If there's a conflict, content of object 'b' overwrites content of 'a'
*/

function el4id(pID) {
  return document.getElementById(pID);
}

function copyMapCenterZoom() {
  console.log("copyMapCenterZoom");
  if (el4id("mymapcenter")) {
    console.log("mymapcenter="+el4id("mymapcenter").value);
    el4id("viewmapcenter").value = el4id("mymapcenter").value;
  } else {
    console.error("CALL: copyMapCenterZoom():16 - el4id('mymapcenter') is undefined - no value can be accessed!");
  };
  el4id("viewzoom").value = el4id("myzoom").value || "10";
  console.log("copyMapCenterZoom after");

}



function createMapLink() {
  console.log("CALL: createMapLink() - set URL in textbox");
  var vURL = "https://niebert.github.io/openlayer_display_markers/viewicons.html?";
  var vMapCenter = el4id("mymapcenter").value;
  console.log("vMapCenter='" + vMapCenter + "'");
  vURL += "mapcenter=" + encodeURIComponent(vMapCenter);
  vURL += "&zoom=" + encodeURIComponent(el4id("myzoom").value);
  vURL += "&jsondata="+ encodeURIComponent(getDataJSON4Link());
  el4id("maplink").value = vURL;
}

function populateDataJSON() {
  vEditor4JSON.saveLS(); // save JSON Data to Local Storage
  copyMapCenterZoom();
  var vOut = getDataJSON4Link();
  //document.getElementById('jsondata').value = JSON.stringify(vJSON,null,4);
  document.getElementById('jsondata').value = encodeURIComponent(vOut);
}

function getDataJSON4Link() {
  var vData = vEditor4JSON.aData;
  var vOut = "";
  var vCR = "";
  var vRecOut = "";
  var vMapCenterMissing = true;
  for (var i = 0; i < vData.length; i++) {
    vRecOut = getMarkerString(i+1,vData[i]);
    if (vRecOut != "") {
      vOut += vCR + vRecOut;
      vCR = ",\n";
      if (vMapCenterMissing) {
        el4id("mymapcenter").value = vData[i].lng+","+vData[i].lat;
        vMapCenterMissing = false;
      }
    };
  };
  vOut = "[" + vOut + "]";
  return vOut
}


function getMarkerString(pNr,pRec) {
  var vOut = "";
  if (pRec.geolocation != "") {
    vOut += "{ \"geolocation\" : ["+pRec.geolocation+"],";
    vOut += "\"name\" : \"";
    vOut +="<b>";
    if (pRec.url != "") {
      vOut += "<a href=\\\""+pRec.url+"\\\" target=\\\"_blank\\\">"+pRec.title4map+"</a>";
    } else {
      vOut += pRec.title4map;
    };
    vOut +="</b><br/>";
    if (pRec.hasOwnProperty("comment")) {
      if (pRec.comment != "") {
        vOut += pRec.comment.replace(/"/g,'\"');
        vOut +="<br/>";
      }
    }
    vOut += "<a href=\\\"http://www.un.org/sustainabledevelopment/sustainable-development-goals/\\\" target=\\\"_blank\\\">";
    vOut += "SDG "+pRec.SDG.join(",");
    vOut += "</a>\"";
    vOut += "}"
  } else {
    //console.log("("+pNr+") missing geolocation in record");
    alert("("+pNr+") missing geolocation in record");
  };
  return vOut;
}
