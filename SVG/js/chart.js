function bubble_cloud() {
// Main function of bubble cloud SVG diagram.
// Entry point for variable definitions and SVG tag define.

    //==================
    // Define VARIABLES
    //==================

    // Define title and subtitle
    var title = {'text':"CO2 emission in Year 2011", 'x':30, 'y':49};
    var subtitle = {'text':"Metric tons of CO2 per US$ of GDP", 'x':29, 'y':78};

    // Define title and subtitle
    var title = {'text':"CO2 emission in Year 2011", 'x':30, 'y':49};
    var subtitle = {'text':"Metric tons of CO2 per US$ of GDP", 'x':29, 'y':78};
    // Define countries
    var countries = ['China', 'India', 'Russian', 'Japan', 'Germany', 'United Kingdom', 'France', 'Canada','United States', 'Brazil'];
    // Define attributes for each country
    var country_attributes = {
        'China':{'circle': {'cx':663, 'cy':321, 'r':100.5, 'fill':'#ffad33'}, 
            'label':{'x':585, 'y':300, 'font-size':'60px'}, 
            'value':{'x':568, 'y':368, 'font-size':'70px', 'display':'1,199'}},
        'India':{'circle': {'cx':515, 'cy':452, 'r':96.2, 'fill':'#2fa9cd'}, 
            'label':{'x':445, 'y':435, 'font-size':'65px'}, 
            'value':{'x':425, 'y':503, 'font-size':'68px', 'display':'1,108'}},
        'Russian':{'circle': {'cx':658, 'cy':132, 'r':85.4, 'fill':'#85bb33'}, 
            'label':{'x':589, 'y':112, 'font-size':'40px'}, 
            'value':{'x':592, 'y':194, 'font-size':'80px', 'display':'890'}},
        'Japan':{'circle': {'cx':802, 'cy':296, 'r':41.1, 'fill':'#e46992'}, 
            'label':{'x':768, 'y':290, 'font-size':'25px'}, 
            'value':{'x':770, 'y':321, 'font-size':'35px', 'display':'193'}},
        'Germany':{'circle': {'cx':538, 'cy':184, 'r':41.1, 'fill':'#ad33ad'}, 
            'label':{'x':503, 'y':175, 'font-size':'17px'}, 
            'value':{'x':500, 'y':212, 'font-size':'43px', 'display':'194'}},
        'United Kingdom':{'circle': {'cx':463, 'cy':137, 'r':36.75, 'fill':'#a54050'}, 
            'label':{'x':400, 'y':132, 'font-size':'17px'}, 
            'value':{'x':431, 'y':162, 'font-size':'35px', 'display':'172'}},
        'France':{'circle': {'cx':482, 'cy':210, 'r':19.4, 'fill':'#40ab46'}, 
            'label':{'x':467, 'y':205, 'font-size':'10px'}, 
            'value':{'x':452, 'y':225, 'font-size':'25px', 'display':'118'}},
        'Canada':{'circle': {'cx':124, 'cy':167, 'r':49.7, 'fill':'#e36141'}, 
            'label':{'x':80, 'y':160, 'font-size':'25px'}, 
            'value':{'x':90, 'y':200, 'font-size':'44px', 'display':'271'}},
        'United States':{'circle': {'cx':123, 'cy':273, 'r':56.2, 'fill':'#5a82aa'}, 
            'label':{'x':61, 'y':256, 'font-size':'20px'}, 
            'value':{'x':76, 'y':307, 'font-size':'55px', 'display':'342'}},
        'Brazil':{'circle': {'cx':198, 'cy':400, 'r':30.3, 'fill':'#3366cc'}, 
            'label':{'x':175, 'y':394, 'font-size':'17px'}, 
            'value':{'x':170, 'y':420, 'font-size':'30px', 'display':'168'}}
        } 
    // Define size of SVG diagram
    var svg_width = 900;
    var svg_height = 600;

    // Create SVG diagram size
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); //create svg
    svg.setAttribute('width', svg_width);
    svg.setAttribute('height', svg_height);

    document.getElementById("show-svg").appendChild(svg);  //append in show-svg div tag

    // Draw circle and text for each country
    for (country_idx in countries) {
        country = countries[country_idx]
        draw_svg(svg, title, subtitle, country, country_attributes[country])
    }
}

function draw_svg(svg, title, subtitle, country, attributes){
// Draw the title, subtitle, circle, and text of label and value.
    //Define title and subtitle
    var title_text = document.createElementNS("http://www.w3.org/2000/svg", "text");  //create text
    
    // Set title text attritubes.
    title_text.setAttribute('x',  title['x']);
    title_text.setAttribute('y', title['y']);
    title_text.setAttribute('class', "title"); // adopt title text style
    var title_textNode = document.createTextNode(title['text']); //add title text
    title_text.appendChild(title_textNode);
    svg.appendChild(title_text);  //append title text node into svg

    //Define title and subtitle
    var subtitle_text = document.createElementNS("http://www.w3.org/2000/svg", "text");  //create text

    // Set sub title text attritubes.
    subtitle_text.setAttribute('x',  subtitle['x']);
    subtitle_text.setAttribute('y', subtitle['y']);
    subtitle_text.setAttribute('class', "subtitle"); // adopt subtitle text style
    var subtitle_textNode = document.createTextNode(subtitle['text']); //add subtitle text
    subtitle_text.appendChild(subtitle_textNode);
    svg.appendChild(subtitle_text);  //append subtitle text node into svg

    // Define bubble for each country
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");  //create circle
    // Set circle attritubes.
    circle.setAttribute('cx', attributes['circle']['cx']);
    circle.setAttribute('cy',  attributes['circle']['cy']);
    circle.setAttribute('r',  attributes['circle']['r']);
    circle.setAttribute('fill', attributes['circle']['fill']);
    svg.appendChild(circle);  //append in svg

    //Define label for each country
    var label = document.createElementNS("http://www.w3.org/2000/svg", "text");  //create text
    // Set text attritubes.
    label.setAttribute('x',  attributes['label']['x']);
    label.setAttribute('y', attributes['label']['y']);
    label.setAttribute('style', "font-size:" + attributes['label']['font-size']);
    var label_textNode = document.createTextNode(country); //add country
    label.appendChild(label_textNode);
    svg.appendChild(label);  //append label text node into svg

    //Define value  for each country
    var value_text = document.createElementNS("http://www.w3.org/2000/svg", "text");  //create text
    value_text.setAttribute('x', attributes['value']['x']);
    value_text.setAttribute('y', attributes['value']['y']);
    value_text.setAttribute('class', "white"); // adopt white text style
    value_text.setAttribute('style', "font-size:" + attributes['value']['font-size']);
    var value_textNode = document.createTextNode(attributes['value']['display']); // add value
    value_text.appendChild(value_textNode);    
    svg.appendChild(value_text);  //append value text node into svg

}