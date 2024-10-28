// Function to update time
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById("current-time").innerText = ` ${hours}:${minutes}:${seconds}`;
}

// Update time every second
setInterval(updateTime, 1000);
updateTime(); // Initial call to set time immediately

// Language change handler
document.getElementById("language-select").addEventListener("change", function () {
    const selectedLanguage = this.value;

    // Set the `lang` attribute on the <html> tag to change the language
    document.documentElement.lang = selectedLanguage;

    // Alternatively, if you have localized URLs, you could redirect to a specific URL.
    // For example:
    // window.location.href = `/${selectedLanguage}/your-page-url`;
});

document.addEventListener("DOMContentLoaded", function () {
    // Initialize the map in the #map div
    var map = L.map('map').setView([0, 0], 2); // Default view

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Center the map at the user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;

                // Set map view to user's location with a suitable zoom level
                map.setView([lat, lng], 13);

                // Add a marker at the user's location
                L.marker([lat, lng]).addTo(map)
                    .bindPopup("You are here")
                    .openPopup();
            },
            function (error) {
                console.error("Geolocation error: ", error);
                alert("Unable to retrieve your location.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }

    // Allow user to drop pins by clicking on the map
    map.on('click', function (e) {
        // Get the coordinates where the user clicked
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;

        // Create a new marker at the clicked location
        var marker = L.marker([lat, lng]).addTo(map)
            .bindPopup(`Dropped pin at ${lat.toFixed(5)}, ${lng.toFixed(5)} <br> (Click to remove)`)
            .openPopup(); // Opens the popup immediately after adding the marker

        // Add click event to remove marker on click
        marker.on('click', function () {
            map.removeLayer(marker); // Remove the marker from the map
        });
    });
});

function updateContent() {
    document.querySelector("#app_title").textContent = i18next.t("app_title");
    document.querySelector("#nav_flights").textContent = i18next.t("nav_flights");
    document.querySelector("#nav_track").textContent = i18next.t("nav_track");
    document.querySelector("#nav_weather").textContent = i18next.t("nav_weather");
    document.querySelector("#nav_airports").textContent = i18next.t("nav_airports");
    document.querySelector("#new_flight").textContent = i18next.t("new_flight");
    document.querySelector("#flight_details").textContent = i18next.t("flight_details");
    document.querySelector("#tail_number").textContent = i18next.t("tail_number");
    document.querySelector("#flight_code").textContent = i18next.t("flight_code");
    document.querySelector("#departure_time").textContent = i18next.t("departure_time");
    document.querySelector("#arrival_time").textContent = i18next.t("arrival_time");
    document.querySelector("#flight_status").textContent = i18next.t("flight_status");
    document.querySelector("#aircraft_details").textContent = i18next.t("aircraft_details");
    document.querySelector("#operational_status").textContent = i18next.t("operational_status");
    document.querySelector("#aircraft_model").textContent = i18next.t("aircraft_model");
    document.querySelector("#propulsion_type").textContent = i18next.t("propulsion_type");
    document.querySelector("#passenger_capacity").textContent = i18next.t("passenger_capacity");
    document.querySelector("#reset").textContent = i18next.t("reset");
    document.querySelector("#recalculate").textContent = i18next.t("recalculate");
    document.querySelector("#autoroute").textContent = i18next.t("autoroute");
    document.querySelector("#save").textContent = i18next.t("save");
    document.querySelector("#next").textContent = i18next.t("next");
}

document.querySelector("#language-select").addEventListener("change", function (e) {
    i18next.changeLanguage(e.target.value, function() {
        updateContent();
    });
});

i18next.init({
    lng: 'en', // default language
    resources: {
        en: {
            translation: {
                "app_title": "The Normalizers: Flight Planner",
                "nav_flights": "Flights",
                "nav_track": "Track",
                "nav_weather": "Weather",
                "nav_airports": "Airports",
                "new_flight": "New Flight",
                "flight_details": "Flight Details",
                "tail_number": "Tail Number",
                "flight_code": "Flight Code",
                "departure_time": "Departure Time",
                "arrival_time": "Arrival Time",
                "flight_status": "Flight Status",
                "aircraft_details": "Aircraft Details",
                "operational_status": "Operational Status",
                "aircraft_model": "Aircraft Model",
                "propulsion_type": "Propulsion Type",
                "passenger_capacity": "Passenger Capacity",
                "reset": "Reset",
                "recalculate": "Recalculate",
                "autoroute": "Autoroute",
                "save": "Save",
                "next": "Next"
            }
        },
        es: {
            translation: {
                "app_title": "Los Normalizadores: Planificador de Vuelo",
                "nav_flights": "Vuelos",
                "nav_track": "Rastrear",
                "nav_weather": "Clima",
                "nav_airports": "Aeropuertos",
                "new_flight": "Nuevo Vuelo",
                "flight_details": "Detalles del Vuelo",
                "tail_number": "Número de Cola",
                "flight_code": "Código de Vuelo",
                "departure_time": "Hora de Salida",
                "arrival_time": "Hora de Llegada",
                "flight_status": "Estado del Vuelo",
                "aircraft_details": "Detalles de la Aeronave",
                "operational_status": "Estado Operacional",
                "aircraft_model": "Modelo de Aeronave",
                "propulsion_type": "Tipo de Propulsión",
                "passenger_capacity": "Capacidad de Pasajeros",
                "reset": "Reiniciar",
                "recalculate": "Recalcular",
                "autoroute": "Autorruta",
                "save": "Guardar",
                "next": "Siguiente"
            }
        },
        fr: {
            translation: {
                "app_title": "Les Normalisateurs : Planificateur de Vol",
                "nav_flights": "Vols",
                "nav_track": "Suivre",
                "nav_weather": "Météo",
                "nav_airports": "Aéroports",
                "new_flight": "Nouveau Vol",
                "flight_details": "Détails du Vol",
                "tail_number": "Numéro de Queue",
                "flight_code": "Code de Vol",
                "departure_time": "Heure de Départ",
                "arrival_time": "Heure d'Arrivée",
                "flight_status": "Statut du Vol",
                "aircraft_details": "Détails de l'Avion",
                "operational_status": "Statut Opérationnel",
                "aircraft_model": "Modèle d'Avion",
                "propulsion_type": "Type de Propulsion",
                "passenger_capacity": "Capacité de Passagers",
                "reset": "Réinitialiser",
                "recalculate": "Recalculer",
                "autoroute": "Autoroute",
                "save": "Enregistrer",
                "next": "Suivant"
            }
        },
        de: {
            translation: {
                "app_title": "Die Normalisierer: Flugplaner",
                "nav_flights": "Flüge",
                "nav_track": "Verfolgen",
                "nav_weather": "Wetter",
                "nav_airports": "Flughäfen",
                "new_flight": "Neuer Flug",
                "flight_details": "Flugdaten",
                "tail_number": "Hecknummer",
                "flight_code": "Flugcode",
                "departure_time": "Abflugzeit",
                "arrival_time": "Ankunftszeit",
                "flight_status": "Flugstatus",
                "aircraft_details": "Flugzeugdetails",
                "operational_status": "Betriebsstatus",
                "aircraft_model": "Flugzeugmodell",
                "propulsion_type": "Antriebsart",
                "passenger_capacity": "Passagierkapazität",
                "reset": "Zurücksetzen",
                "recalculate": "Neu Berechnen",
                "autoroute": "Automatisch Routen",
                "save": "Speichern",
                "next": "Weiter"
            }
        },
        zh: {
            translation: {
                "app_title": "规范者：飞行计划器",
                "nav_flights": "航班",
                "nav_track": "跟踪",
                "nav_weather": "天气",
                "nav_airports": "机场",
                "new_flight": "新航班",
                "flight_details": "航班详情",
                "tail_number": "尾号",
                "flight_code": "航班代码",
                "departure_time": "出发时间",
                "arrival_time": "到达时间",
                "flight_status": "航班状态",
                "aircraft_details": "飞机详情",
                "operational_status": "运行状态",
                "aircraft_model": "飞机型号",
                "propulsion_type": "推进类型",
                "passenger_capacity": "乘客容量",
                "reset": "重置",
                "recalculate": "重新计算",
                "autoroute": "自动路由",
                "save": "保存",
                "next": "下一步"
            }
        },
        ja: {
            translation: {
                "app_title": "ノーマライザー：フライトプランナー",
                "nav_flights": "フライト",
                "nav_track": "追跡",
                "nav_weather": "天気",
                "nav_airports": "空港",
                "new_flight": "新しいフライト",
                "flight_details": "フライトの詳細",
                "tail_number": "テールナンバー",
                "flight_code": "フライトコード",
                "departure_time": "出発時間",
                "arrival_time": "到着時間",
                "flight_status": "フライトステータス",
                "aircraft_details": "航空機の詳細",
                "operational_status": "運行状況",
                "aircraft_model": "航空機モデル",
                "propulsion_type": "推進タイプ",
                "passenger_capacity": "乗客定員",
                "reset": "リセット",
                "recalculate": "再計算",
                "autoroute": "自動ルート",
                "save": "保存",
                "next": "次へ"
            }
        },
        ru: {
            translation: {
                "app_title": "Нормализаторы: Планировщик Полетов",
                "nav_flights": "Рейсы",
                "nav_track": "Отслеживание",
                "nav_weather": "Погода",
                "nav_airports": "Аэропорты",
                "new_flight": "Новый Рейс",
                "flight_details": "Детали Рейса",
                "tail_number": "Бортовой Номер",
                "flight_code": "Код Рейса",
                "departure_time": "Время Отправления",
                "arrival_time": "Время Прибытия",
                "flight_status": "Статус Рейса",
                "aircraft_details": "Детали Самолета",
                "operational_status": "Оперативный Статус",
                "aircraft_model": "Модель Самолета",
                "propulsion_type": "Тип Движителя",
                "passenger_capacity": "Пассажировместимость",
                "reset": "Сбросить",
                "recalculate": "Пересчитать",
                "autoroute": "Автомаршрут",
                "save": "Сохранить",
                "next": "Далее"
            }
        }
    }
}, function(err, t) {
    // Initialize text on the page
    updateContent();
});
