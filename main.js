'use strict';

const elements = {

  "patternsElement" : "calculator__patterns",
  "partsElement" : "calculator__parts",
  "colorsElement" : "calculator__palette",
  "svgElement" : "calculator__svg",
  "defaultColor" : "#e4dfd9",
  "title" : "calculator__pattern",
  "status" : "calculator__status",
  "view" : "calculator__buttons-view",
  "pattern" : "calculator__patterns-image",
  "tile" : "calculator__view-tile",
  "pdf" : "calculator__buttons-pdf"

}

const names = {
  1: 'royal_bud',
  2: 'paradise_bird',
  3: 'persian_lace',
  4: 'orient_necklace',
  5: '1001_nights',
  6: 'ethnicity'
}

window.addEventListener('DOMContentLoaded', tileViewer(), false);

function tileViewer() {

  //Objects.
  let pattern;
  let crds;
  let store = {};

  //Events listeners.
  let patterns = document.querySelector('.' + elements["patternsElement"]);
  let parts = document.querySelector('.' + elements["partsElement"]);
  let colors = document.querySelector('.' + elements["colorsElement"]);
  let svgs = document.querySelector('.' + elements["svgElement"]);
  let view = document.querySelector('.' + elements["view"]);
  let image = document.querySelector('.' + elements["pattern"]);
  let pdf = document.querySelector('.' + elements["pdf"]);

  //Globel variables.
  let name = names[1];
  let launched = false;
  let part = 1;
  let url_common;
  let url_part;

  getUrl(name,part);
  createStructure(url_common,url_part,name, part,event);

  patterns.addEventListener('click', switchPattern, false);
  parts.addEventListener('click', changePart, false);
  colors.addEventListener('click', changeColor, false);
  view.addEventListener('click', updateView, false);
  pdf.addEventListener('click', createPdf, false);

  //Creating URLs.
  function getUrl(name,p) {

    let prefix = '_part_';
    let root = 'objects/';
    let format = '.json';
    let part = p;
    let obj = name;
    url_common = root;
    url_part = root;
    let pattern;
    let crds;

    //Checking an object.
    switch (obj) {
      case 'royal_bud':
        let folder1 = names[1] + '/';
        url_common += folder1 + obj + format;
        url_part += folder1 + obj + prefix + part + format;
        break;
      case 'paradise_bird':
        let folder2 = names[2]+ '/';
        url_common += folder2 + obj + format;
        url_part += folder2 + obj + prefix + part + format;
        break;
      case 'persian_lace':
        let folder3 = names[3]+ '/';
        url_common += folder3 + obj + format;
        url_part += folder3 + obj + prefix + part + format;
        break;
      case 'orient_necklace':
        let folder4 = names[4]+ '/';
        url_common += folder4 + obj + format;
        url_part += folder4 + obj + prefix + part + format;
        break;
      case '1001_nights':
        let folder5 = names[5]+ '/';
        url_common += folder5 + obj + format;
        url_part += folder5 + obj + prefix + part + format;
        break;
      case 'ethnicity':
        let folder6 = names[6]+ '/';
        url_common += folder6 + obj + format;
        url_part += folder6 + obj + prefix + part + format;
        break;
      default:
        console.log('You made a mistake!');
        break;
    }

  }

  //Creating images.
  function createImage(pattern,crds,part,event) {

    let sts = elements["status"];
    let ttl = elements["title"];
    let status = document.querySelector('.' + sts);

    let obj = pattern;
    let svgdata = crds;
    let partValue = part;

    let title = document.querySelector('.' + ttl);
    title.textContent = obj.name;

    pathes(obj,svgdata,partValue,event)
    objectParts(obj);
    objectColors(obj);
    status.textContent = '';

  }

  //Pathes rendering.
  function pathes(obj,svgdata,part,event) {

    let d = svgdata;

    let current = svgs.childElementCount;
    let necessary = obj.parts.length;

    let svg = elements["svgElement"];
    let prt = elements["partsElement"]
    let clr = elements["defaultColor"];

    //All svg pathes.
    let pathes = document.querySelectorAll('.' + elements['svgElement'] + '-path');
    //If there is no pathes in the current container.
    if (current == 0) {
      launched = true;

      let postfix = '-path';
      let modifier = '--active';
      let exp = [];;

      for (let i=0; i < necessary; i++) {

        if (!svgs.insertAdjacentHTML) {
          let btag = '<path ';
          let cls = 'class="' + svg + postfix + '" ';
          let value = 'value="' + (necessary - i) + '" ';
          let etag = '></path>';
          let tmp = btag + cls + value + etag;
          exp.unshift(tmp);

        } else {
          svgs.insertAdjacentHTML('afterbegin','<path/>');
          svgs.firstElementChild.setAttribute('value', obj.parts.length - i);
          svgs.firstElementChild.classList.add(svg + postfix);
        }

      }

      if (exp.length > 0) {
        svgs.innerHTML = exp;
      }

      svgs.firstElementChild.setAttribute('d', d["path"]);
      svgs.firstElementChild.classList.add(svg + postfix + modifier);
      svgs.firstElementChild.style.fill = clr;
      return;

  }

    //If the current quanity is equal to necessary quanity.
    if (current == necessary) {
      console.log('They are equal!');

        let activePath = document.querySelector('.' + svg + '-path--active');
        let activePart = document.querySelector('.' + prt + '-name--active');

        for (let i = 0; i < necessary; i++) {

          parts.children[i].textContent = obj.parts[i];
          pathes[i].style.fill= '';
          pathes[i].setAttribute('d','');
        }

        // checkColors(colorsContainer);
        pathes[0].setAttribute('d', d["path"]);
        activePath.classList.remove(svg + '-path--active');
        svgs.firstElementChild.setAttribute('class', svg + '-path' + ' ' + svg + '-path--active');
        activePart.classList.remove(prt + '-name--active');
        parts.firstElementChild.classList.add(prt + '-name--active');
        pathes[0].style.fill = clr;

  } else if (current > necessary) {
    console.log('The current quanity is more then necessary!');

    let postfix = '-path';
    let modifier = '--active';

    let difference = Math.abs(current - necessary);
    console.log(difference);
    console.log(url_common);
    console.log(url_part);

    let activePath = document.querySelector('.' + svg + '-path--active');
    let activePart = document.querySelector('.' + prt + '-name--active');

    for (let i = 0; i < difference; i++) {

      parts.removeChild(parts.lastElementChild);
      parts.lastElementChild.style.fill = '';
      svgs.removeChild(svgs.lastElementChild);
      svgs.lastElementChild.style.fill = '';

    }

    for (let i = 0; i < current; i++) {
      pathes[i].setAttribute('d','');
      pathes[i].style.fill = '';
    }

    // checkColors(colorsContainer);
    pathes[0].setAttribute('d', d["path"]);
    activePath.classList.remove(svg + '-path--active');
    svgs.firstElementChild.classList.add(svg + postfix);
    svgs.firstElementChild.classList.add(svg + postfix + modifier);
    activePart.classList.remove(prt + '-name--active');
    parts.firstElementChild.classList.add(prt + '-name--active');
    pathes[0].style.fill = clr;

  } else {
    console.log('The current quanity is less then necessary!');

    let postfix_1 = '-path';
    let postfix_2 = '-name';
    let modifier = '--active';

    let activePath = document.querySelector('.' + svg + postfix_1 + modifier);
    let activePart = document.querySelector('.' + prt + postfix_2 + modifier);

    let difference = Math.abs(current - necessary);

    console.log(difference);
    let exp = [];

    if (svgs.insertAdjacentHTML) {

      for (let i = difference; i > 0; i--) {

        svgs.insertAdjacentHTML('beforeend','<path/>');
        svgs.lastElementChild.setAttribute('value', (necessary - (i-1)));
        svgs.lastElementChild.classList.add(svg + postfix_1);

      }

      svgs.firstElementChild.setAttribute('d', d["path"]);
      svgs.children[0].classList.add(svg + postfix_1 + modifier);
      svgs.children[0].style.fill = clr;

    } else {

      for (let i = necessary; i > 0; i--) {

        let btag = '<path ';
        let cls = 'class="' + svg + postfix_1 + '" ';
        let value = 'value="' + (necessary - i) + '" ';
        let etag = '></path>';
        let tmp = btag + cls + value + etag;
        exp.unshift(tmp);

      }

      console.log(exp);
      svgs.innerHTML = exp;
      svgs.firstElementChild.classList.add(svg + postfix_1 + modifier);
      let active = document.querySelector('.' + svg + postfix_1 + modifier);
      svgs.firstElementChild.setAttribute('d', d["path"]);
      svgs.firstElementChild.style.fill = clr;

    }

    for (let i = difference; i > 0; i--) {

      let part = document.createElement('li');
      part.classList.add(prt + postfix_2);
      part.setAttribute('value', (necessary - (i-1)));
      parts.appendChild(part);

    }

    for (let i = 0; i < necessary; i++) {
      parts.children[i].textContent = obj.parts[i];
    };

    pathes = document.querySelectorAll('.' + svg + '-path');
    for (let i = 0; i < necessary; i++) {
      pathes[i].setAttribute('d','');
      pathes[i].style.fill = '';
    }

    pathes[0].setAttribute('d', d["path"]);
    activePath.classList.remove(svg + postfix_1 + modifier);
    svgs.firstElementChild.classList.add(svg + postfix_1);
    svgs.firstElementChild.classList.add(svg + postfix_1 + modifier);
    activePart.classList.remove(prt + postfix_2 + modifier);
    parts.firstElementChild.classList.add(prt + postfix_2 + modifier);
    pathes[0].style.fill = clr;

  }

  updateView(event);
}

  //Creating objects.
  function objectParts(obj) {

    let postfix = '-name';
    let modifier = '--active';
    let elm = elements["partsElement"];

    if (parts.childElementCount == 0) {

      for (let i = 0; i < obj.parts.length; i++) {
        let item = document.createElement('li');
        item.classList.add(elm + postfix);
        item.value = i + 1;
        item.textContent = obj.parts[i];
        parts.appendChild(item);
      }

      parts.firstElementChild.classList.add(elm + postfix + modifier);

    }

  }

  //Creating colors.
  function objectColors(obj) {

    let postfix = '-color';
    let modifier = '--active';

    if (colors.childElementCount == 0) {

      for (let i = 0; i < obj.colors.length; i++) {
        let item = document.createElement('li');
        item.classList.add(elements['colorsElement'] + postfix);
        item.style.backgroundColor = obj.colors[i];
        item.value = i + 1;
        colors.appendChild(item);
      }

    }

  }

  //Switching of the pattern.
  function switchPattern(event) {

    let postfix = '-image';
    let modifier = '--active';
    let elm = elements["patternsElement"];

    //Determine of context.
    let target = event.target;
    name = names[target.getAttribute('value')]
    let active = document.querySelector('.' + elm + postfix + modifier);

    if (target && target.classList.contains(elm + postfix + modifier)) {

      return;

    } else if (target && target.classList.contains(elm + postfix)) {

      active.className = elm + postfix;
      target.className = elm + postfix + ' ' + elm + postfix + modifier;
      let pattern = target.getAttribute('value');
      getUrl(names[pattern],1);
      createStructure(url_common,url_part,name,part,event);

    }

  }

  //Changing part.
  function changePart(e) {
    console.log('Changing part!');

    let crds;
    let event = e;

    let ptrn = elements["patternsElement"];
    let svg = elements["svgElement"];
    let prt = elements["partsElement"];

    let prefix = '_part_';
    let modifier = '--active';
    let pattern = document.querySelector('.' + ptrn + '-image' + modifier);
    let part = event.target.value;

    if (event.target === document.body.querySelector('.' + prt + '-name' + modifier)) {

      let currentPath = document.querySelector('.' + svg + '-path' + modifier);
      console.log(currentPath);

      if (!(currentPath.style.fill)) {

        currentPath.style.fill = elements['defaultColor'];
        setTimeout(function () {
          currentPath.style.opacity = '1';
        },300);
        setTimeout(function () {
          currentPath.style.fill = '';
        },300);

      } else {

        currentPath.style.opacity = '0';
        setTimeout(function () {
          currentPath.style.opacity = '1';
        },300);

      }

      return;

    };

    getUrl(names[pattern.getAttribute('value')],part);
    console.log(url_common);
    console.log(url_part);

    if (store[name + prefix + part]) {
      console.log('These coordinates are in the storage!');

      let crds = store;

      let prefix_1 = '-name';
      let prefix_2 = '-path';
      let modifier = '--active';

      let activePart = document.querySelector('.' + prt + prefix_1 + modifier);
      activePart.classList.remove(prt + prefix_1 + modifier);
      let activePath = document.querySelector('.' + svg + prefix_2 + modifier);
      console.log(activePath);
      activePath.className.baseVal = svg + prefix_2;

      if (activePath.getAttribute('d') !== undefined) {
        console.log('Take data from the storage!');

        if (!svgs.insertAdjacentHTML) {

          event.target.classList.add(prt + prefix_1 + modifier);
          let pathes = document.querySelectorAll('.' + svg + prefix_2);

          pathes[part-1].classList.add(svg + prefix_2 + modifier);

        } else {

          event.target.classList.add(prt + prefix_1 + modifier);
          svgs.children[part-1].classList.add(svg + prefix_2 + modifier);
        }

        let currentPath = document.querySelector('.' + svg + '-path' + modifier);
        currentPath.setAttribute('d', crds[name + prefix + part]);

        currentPath.style.opacity = '0';
        setTimeout(function() {
          currentPath.style.opacity = '1';
        },300);

      } else {

        if (!svgs.insertAdjacentHTML) {

          event.target.classList.add(prt + prefix_1 + modifier);
          let pathes = document.querySelectorAll('.' + svg + prefix_2);

          pathes[part-1].classList.add(svg + prefix_2 + modifier);
          pathes[part-1].setAttribute('d', crds[name + prefix + part]);

        } else {

          event.target.classList.add(prt + prefix_1 + modifier);
          svgs.children[part-1].classList.add(svg + prefix_2 + modifier);
          svgs.children[part-1].setAttribute('d', crds[name + prefix + part]);

        }

        let currentPath = document.querySelector('.' + svg + '-path' + modifier);
        currentPath.setAttribute('d', crds[name + prefix + part]);
        currentPath.style.opacity = '1';

      }

    } else {
      console.log('These coordinates are not in the storage!');

      //Creating of the request.
      let request = new XMLHttpRequest();

      request.open('GET', url_common);
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      request.send();

      request.addEventListener('readystatechange', function() {

        if (request.readyState === 4 && request.status == 200) {

          let pattern = JSON.parse(request.response);
          showPath(url_part,pattern,part);

          function showPath(url_part,pattern,part) {

            let request = new XMLHttpRequest();

            request.open('GET', url_part);
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.send();

            request.addEventListener('readystatechange', function () {

              if (request.readyState === 4 && request.status == 200) {

                let elms = [];
                crds = JSON.parse(request.response);
                store[name + prefix + part] = crds["path"];

                let prefix_1 = '-name';
                let prefix_2 = '-path';
                let modifier = '--active';

                let activePart = document.querySelector('.' + elements['partsElement'] + prefix_1 + modifier);
                activePart.classList.remove(elements['partsElement'] + prefix_1 + modifier);

                let activePath = document.querySelector('.' + elements['svgElement'] + prefix_2 + modifier);
                activePath.className.baseVal = elements['svgElement'] + prefix_2;

                if (!svgs.insertAdjacentHTML) {

                  event.target.classList.add(elements['partsElement'] + prefix_1 + modifier);
                  let pathes = document.querySelectorAll('.' + elements["svgElement"] + prefix_2);

                  pathes[part-1].classList.add(elements['svgElement'] + prefix_2 + modifier);
                  pathes[part-1].setAttribute('d', crds["path"]);

                } else {

                  event.target.classList.add(elements['partsElement'] + prefix_1 + modifier);
                  svgs.children[part-1].classList.add(elements['svgElement'] + prefix_2 + modifier);
                  svgs.children[part-1].setAttribute('d', crds["path"]);

                }

                let currentPath = document.querySelector('.' + elements["svgElement"] + prefix_2 + modifier);
                currentPath.style.fill = elements["defaultColor"];
                setTimeout(function(){
                  currentPath.style.fill = '';
                },200);

              } else {
                console.log('The request was not executed!');
              }

            }, false);

          }

        } else {

        }

      }, false)

    }

  }

  //Changing color.
  function changeColor(e) {

    let prefix = '-path';
    let modifier = '--active';
    let color = e.target.style.backgroundColor;

    let activePath = document.querySelector('.' + elements["svgElement"] + prefix + modifier);
    activePath.style.fill = color;
    updateView(e);

  }

  //Creating common structure.
  function createStructure(url_common,url_part,name,part,event) {

    let prefix = '_part_';
    let status = document.querySelector('.' + elements['status']);

    //Request of the common object.
    let request = new XMLHttpRequest();
    request.open('GET', url_common);
    request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    request.send();

    //Checking request
    request.addEventListener('readystatechange', function() {

      if (request.readyState === 4 && request.status == 200) {

        pattern = JSON.parse(request.response);

        //Checking storing coordinates in the object.
        if (store[name + prefix + part]) {
          console.log('Coordinates there are in the object!');
          crds["path"] = store[name + prefix + part];
          createImage(pattern,crds,part,event);

        } else {

          //Request of the object coordinates.
          let request_2 = new XMLHttpRequest();
          request_2.open('GET', url_part);
          request_2.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

          setTimeout(function() {
            request_2.send();
          }, 300);
          status.textContent = 'Идёт загрузка данных';

          //Checking request
          request_2.addEventListener('readystatechange', function() {

            if (request_2.readyState === 4 && request_2.status == 200) {

              crds = JSON.parse(request_2.response);
              saveData(name,crds,part);
              createImage(pattern,crds,part,event);
            }

          }, false);

        }

      }

    }, false);

  }

  //Saving data in the object.
  function saveData(pattern,data,part) {

    let postfix = '_part_';

    if (store[pattern + postfix + part]) {
      return;
    } else {
      store[pattern + postfix + part] = data.path;
    }


  }

  //Common view.
  function updateView(event) {

    console.log('Update view!');

    let elm = 'calculator__view';
    let button = document.querySelector('.calculator__buttons-view');
    let container = document.querySelector('.' + elm);

    if (event.target.classList.contains('calculator__patterns-image')) {

      console.log('3');

      if (!container) {

        console.log('!');

        let calculator = document.querySelector('.calculator');
        container = document.createElement('ul');
        container.classList.add('calculator__view');
        container.classList.add('calculator__view--hidden');

        calculator.appendChild(container);

        for (let i = 0; i < 8; i++) {

          let tile = document.createElement('li');
          tile.classList.add('calculator__view-tile');

          let crds = svgs.innerHTML;

          let svg,
          btag = '<svg ',
          stnd = 'xmlns="http://www.w3.org/2000/svg" ',
          ratio = 'preserveAspectRatio="none" ',
          crdX = 'x="0px" ',
          crdY = 'y="0px" ',
          ver = 'version="1.1" ',
          box = 'viewBox="0 0 480 480" >',
          etag = '</svg>';
          svg = btag + stnd + ratio + crdX + crdY + ver + box + crds + etag;

          tile.innerHTML = svg;
          container.appendChild(tile);

        }

      } else {

        console.log('?');

        for (let i = 0; i < 8; i++) {

          let tiles = document.querySelectorAll('.' + elements["tile"]);
          let data = document.querySelector('.' + elements["svgElement"]);
          let crds = data.innerHTML;

          let svg,
          btag = '<svg ',
          stnd = 'xmlns="http://www.w3.org/2000/svg" ',
          ratio = 'preserveAspectRatio="none" ',
          crdX = 'x="0px" ',
          crdY = 'y="0px" ',
          ver = 'version="1.1" ',
          box = 'viewBox="0 0 480 480" >',
          etag = '</svg>';
          svg = btag + stnd + ratio + crdX + crdY + ver + box + crds + etag;

          tiles[i].innerHTML = svg;

        }

      }

      return;

    }

    if (!container && event.target.classList.contains('calculator__palette-color')) {
      return;
    }

    // Hide view
    if (container && event.target === button) {

      console.log('1');
      container.classList.toggle(elm + '--hidden');
      return;

    }


    if (container) {

      console.log('2');

      let tiles = document.querySelectorAll('.calculator__view-tile');

      for (let i = 0; i < 8; i++) {


        let tile = document.createElement('li');
        tile.classList.add('calculator__view-tile');

        let crds = svgs.innerHTML;

        let svg,
        btag = '<svg ',
        stnd = 'xmlns="http://www.w3.org/2000/svg" ',
        ratio = 'preserveAspectRatio="none" ',
        crdX = 'x="0px" ',
        crdY = 'y="0px" ',
        ver = 'version="1.1" ',
        box = 'viewBox="0 0 480 480" >',
        etag = '</svg>';
        svg = btag + stnd + ratio + crdX + crdY + ver + box + crds + etag;

        console.log(svg);

        tiles[i].innerHTML = svg;

      }

      container.style.display = '';
      container.style.opacity = '1';
      return;

    } else {

      //Create structure
      console.log('4');

      let calculator = document.querySelector('.calculator');
      container = document.createElement('ul');
      container.classList.add('calculator__view');
      container.classList.add('calculator__view--hidden');

      calculator.appendChild(container);

      for (let i = 0; i < 8; i++) {

        let tile = document.createElement('li');
        tile.classList.add('calculator__view-tile');

        let crds = svgs.innerHTML;

        let svg,
        btag = '<svg ',
        stnd = 'xmlns="http://www.w3.org/2000/svg" ',
        ratio = 'preserveAspectRatio="none" ',
        crdX = 'x="0px" ',
        crdY = 'y="0px" ',
        ver = 'version="1.1" ',
        box = 'viewBox="0 0 480 480" >',
        etag = '</svg>';
        svg = btag + stnd + ratio + crdX + crdY + ver + box + crds + etag;

        tile.innerHTML = svg;
        container.appendChild(tile);
        container.classList.remove('calculator__view--hidden');

      }

      return;

    }

  }

  //Creating pdf-file.
  function createPdf(e) {

    let collection = "Коллекция";
    let title = document.querySelector('.' + elements["title"]).textContent;

    pdfMake.fonts = {
      Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
      },
    }

    let data = [

      {
        "text": collection,
        "margin":[0,0,24,0]
      },

      {
        "text": title,
        "margin": [0,0,0,10],
        "fontSize": 24
      },

      {
        "svg": '<svg width="188" height="188" viewBox="0 0 480 480">' + svgs.innerHTML + "</svg>",
        "width": 188,
        "height": 188,
        "margin": [0,0,0,10]
      }

    ]
    let parts = document.querySelectorAll('.' + elements["partsElement"] + '-name');
    let pathes = document.querySelectorAll('.' + elements["svgElement"] + '-path');

    for (let i = 0; i < parts.length; i++) {

      let obj = {},
          arr = [],
          name = parts[i].textContent,
          color = parts[i].style.backgroundColor;

          let part = {};
          part["width"] = "50%";
          part["text"] = name;
          part["margin"] = [0,0,0,3];

          let code = {};
          let line = {};
          code["width"] = "50%";
          if (!pathes[i]) {
            break;
          } else {
            code["text"] = pathes[i].style.fill;
          }
          code["alignment"] = "right";

          line["color"] = "#ffffff";
          line["text"] = "Цветовой оттенок";
          line["width"] = "100%";
          line["fontSize"] = 6;
          line["lineHeight"] = 1.4;

          arr.push(part);
          arr.push(code);

          obj["columns"] = arr;
          data.push(obj);
          data.push(line);

    }

    let doc = {

      "info": {
        "title": "Образец плитки",
        "author": "Мир Деколи",
        "subject": "SVG"
      },

      "pageSize": "A4",
      "pageOrientation": "landscape",
      "pageMargins": [50,50,50,50],

      "header": function(currentPage) {

        return {
          "text": "Образец плитки",
          "alignment": "right",
          "margin": [0,30,30,30]
        }

      },

      "content": [

        data

      ]

    }

    pdfMake.createPdf(doc,null,fonts).open();



  }

}
