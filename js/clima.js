$(document).ready(() => {

    $("#buscar").click(() => {

    $("#tabela tr").remove();

    let tabela = $("#tabela");

    var nomeCidade = document.getElementById("cidade").value;
    console.log(nomeCidade);

    var locationUrl = `https://api.geoapify.com/v1/geocode/search?text=${nomeCidade}&format=json&apiKey=f35a5631a7eb46ce85b4cf650be8df0f`;

    var coluna;
    var valor;
    let div = $("<div>");


    $.get(locationUrl, function (data) {
        var location = data;
        console.log(location);
        coluna = ["Insira uma Cidade: "];
        cidade = location.results[0].city;
        lat = location.results[0].lat;
        lon = location.results[0].lon;
        console.log(cidade);
        div.append(coluna);


        console.log(lat);

        var url = `https://api.darksky.net/forecast/8eeafa93fa171bb970bfac9b03caa3a3/${lat},${lon}?exclude=minutely,hourly,daily,flags,alerts`;


        $.get(url, function (data) {
            var clima = data;
            console.log(clima)
            var colunas = [
                "Local",
                "Latitude",
                "Longitude",
                "Resumo",
                "Intensidade de precipitação",
                "Probabilidade de precipitação",
                "Temperatura",
                "Sensação térmica",
                "Umidade",
                "Pressão",
                "Velocidade do vento",
                "Rajada de vento",
                "Direção do vento",
                "Cobertura de nuvens",
                "Índice UV",
                "Visibilidade",
                "Deslocamento"
            ]

            var valores = [
                clima.timezone,
                clima.latitude,
                clima.longitude,
                clima.currently.summary,
                clima.currently.precipIntensity,
                clima.currently.precipProbability,
                ((clima.currently.temperature - 32) / 1.8).toFixed(1) + " C°",
                ((clima.currently.apparentTemperature - 32) / 1.8).toFixed(1) + " C°",
                clima.currently.humidity + " kg/m³",
                clima.currently.pressure + " N/m²",
                clima.currently.windSpeed + " km/h",
                clima.currently.windGust + " km/h",
                clima.currently.windBearing,
                clima.currently.cloudCover,
                clima.currently.uvIndex,
                clima.currently.visibility,
                clima.offset,
            ]


            let tr = $("<tr>");
            let th = $("<th>");
            let td = $("<td>");

            th.text("Descrição");
            td.text("Valor");
            tr.append(th);
            tr.append(td);
            tabela.append(tr);

            for (let i = 0; i < colunas.length; i++) {
                tr = $("<tr>");
                th = $("<th>");
                th.text(colunas[i]);
                td = $("<td>");
                td.text(valores[i]);
                tr.append(th);
                tr.append(td);
                tabela.append(tr);
            }
            tabela.addClass("table-bordered table-hover");
        })
    })
    })
})