/**
* Extend object 'a' with the properties of object 'b'.
* If there's a conflict, content of object 'b' overwrites content of 'a'
*/

function el4id(pID) {
  return document.getElementById(pID);
}

function copyMapCenterZoom() {
  el4id("viewmapcenter").value = el4id("mymapcenter").value
  el4id("viewzoom").value = el4id("myzoom").value
}

function populateDataJSON() {
  vEditor4JSON.saveLS(); // save JSON Data to Local Storage
  copyMapCenterZoom();
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
        el4id("mymapcenter").value = vData[i].geolocation;
        vMapCenterMissing = false;
      }
    };
  };
  vOut = "[" + vOut + "]";
  //var vJSON = vData;
  //document.getElementById('jsondata').value = JSON.stringify(vJSON,null,4);
  document.getElementById('jsondata').value = vOut;
};

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
