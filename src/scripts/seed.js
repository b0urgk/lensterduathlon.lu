require('dotenv').config();
const mongoose = require('mongoose');
const Content = require('../models/Content');
const Event = require('../models/Event');

const eventData = {
  eventTitle: 'Lënster Duathlon 2026',
  eventDate: new Date('2026-05-03'),
  eventEdition: '2026',
  location: 'Park+Ride Rossbuer, Junglinster',
  schedule: [
    { time: '08:00', activity: 'Race Kit Distribution' },
    { time: '08:15', activity: 'Check-in & Technical Inspection' },
    { time: '09:30', activity: 'Start Race 1 (Youth A / Juniors / Promo)' },
    { time: '10:00', activity: 'Start Race 2 (Elite / Age-groupers / Relay)' },
    { time: '11:00', activity: 'Awards Ceremony Race 1' },
    { time: '11:30', activity: 'Start Race 3 (Youth B/C)' },
    { time: '12:00', activity: 'Awards Ceremony Race 3' },
    { time: '12:30', activity: 'Start Race 4 (Kids A)' },
    { time: '13:00', activity: 'Start Race 5 (Kids B)' },
    { time: '13:30', activity: 'Start Race 6 (Bambinis)' },
    { time: '14:00', activity: 'Awards Ceremony Kids' }
  ],
  contactInfo: {
    email: 'info@lensterduathlon.lu',
    phone: '+352 123 456 789'
  },
  resultsLink: 'https://results.lensterduathlon.lu'
};

const homeDataEn = {
  language: 'en',
  page: 'home',
  sections: [
    { key: 'heroTitle', value: 'Lënster Duathlon' },
    { key: 'heroDescription', value: 'Join us for an exciting combination of running and cycling in the beautiful surroundings of Junglinster.' },
    { key: 'ctaButton', value: 'Register' },
    { key: 'countDownTitleDays', value: 'Days' },
    { key: 'countDownTitleHours', value: 'Hours' },
    { key: 'countDownTitleMinutes', value: 'Minutes' },
    { key: 'countDownTitleSeconds', value: 'Seconds' },
    { key: 'sponsorsTitle', value: 'Our Sponsors' },
    { key: 'infoTitle', value: 'Info' },
    { key: 'infoDescription', value: 'Everything you need to know for your successful race day: schedule, start times, registration procedures, entry fees, and rules.' },
    { key: 'infoButton', value: 'Info' },
    { key: 'coursesTitle', value: 'Courses' },
    { key: 'coursesDescription', value: 'Discover our challenging and scenic routes for athletes of all levels. From the demanding bike course with panoramic views to the varied running route through picturesque landscapes - here you will find detailed course maps, elevation profiles, and GPS data for your optimal race experience.' },
    { key: 'coursesButton', value: 'Courses' },
    { key: 'volunteersTitle', value: 'Volunteers' },
    { key: 'volunteersDescription', value: 'Become part of our dedicated team! Without our fantastic volunteers, this duathlon would not be possible. Here you can find out how you can support us - whether at refreshment stations, route marking, or in the finish area. Sign up, bring friends, and experience the special atmosphere of our event from a whole new perspective.' },
    { key: 'volunteersButton', value: 'Volunteer' },
    { key: 'logoTagline', value: 'POWERED BY Agence Steve Greisch' },
    { key: 'navInfo', value: 'Info' },
    { key: 'navRoutes', value: 'Courses' },
    { key: 'navRoutesKids', value: 'Kids A/B' },
    { key: 'navRoutesYouthB', value: 'Youth B/C' },
    { key: 'navRoutesElite', value: 'Elite/AK/Relay' },
    { key: 'navRoutesYouthA', value: 'Youth A/Promo/Juniors' },
    { key: 'navArchive', value: 'Archive' },
    { key: 'navSponsors', value: 'Sponsors' },
    { key: 'navVolunteers', value: 'Volunteers' },
    { key: 'navContact', value: 'Contact' },
    { key: 'footerAboutTitle', value: 'About the Event' },
    { key: 'footerAboutText', value: 'The national duathlon championship is the most important event in Luxembourg that combines running and cycling. Compete for the national title in an unforgettable race through the beautiful landscapes of Junglinster.' },
    { key: 'footerInfoTitle', value: 'Event Information' },
    { key: 'footerInfoProgram', value: 'Schedule' },
    { key: 'footerInfoRegister', value: 'Register Now' },
    { key: 'footerInfoCourses', value: 'Courses' },
    { key: 'footerContactTitle', value: 'Contact' },
    { key: 'footerContactText', value: 'If you have questions or need more information, please feel free to contact us:' },
    { key: 'footerFollowTitle', value: 'Follow Us' },
    { key: 'footerFollowText', value: 'Stay updated with the latest news and event information through our social media channels.' },
    { key: 'footerCopyright', value: '© 2025 KARIBU a.s.b.l. All rights reserved.' }
  ],
  lastUpdated: new Date()
};

const homeDataDe = {
  language: 'de',
  page: 'home',
  sections: [
    { key: 'heroTitle', value: 'Lënster Duathlon' },
    { key: 'heroDescription', value: 'Sei dabei bei einer aufregenden Kombination aus Laufen und Radfahren inmitten des wunderschönen Junglinsters.' },
    { key: 'ctaButton', value: 'Anmelden' },
    { key: 'countDownTitleDays', value: 'Tage' },
    { key: 'countDownTitleHours', value: 'Stunden' },
    { key: 'countDownTitleMinutes', value: 'Minuten' },
    { key: 'countDownTitleSeconds', value: 'Sekunden' },
    { key: 'sponsorsTitle', value: 'Unsere Sponsoren' },
    { key: 'infoTitle', value: 'Infos' },
    { key: 'infoDescription', value: 'Alles, was du für deinen erfolgreichen Wettkampftag wissen musst: Zeitplan, Startzeiten, Anmeldemodalitäten, Teilnahmegebühren und Regelwerk.' },
    { key: 'infoButton', value: 'Infos' },
    { key: 'coursesTitle', value: 'Strecken' },
    { key: 'coursesDescription', value: 'Entdecke unsere herausfordernden und landschaftlich reizvollen Strecken für Sportler aller Leistungsklassen. Von der anspruchsvollen Radrunde mit Panoramablicken bis zur abwechslungsreichen Laufstrecke durch malerische Landschaften – hier findest du detaillierte Streckenpläne, Höhenprofile und GPS-Daten für dein optimales Rennerlebnis.' },
    { key: 'coursesButton', value: 'Strecken' },
    { key: 'volunteersTitle', value: 'Helfer' },
    { key: 'volunteersDescription', value: 'Werde Teil unseres engagierten Teams! Ohne unsere fantastischen Helfer wäre dieser Duathlon nicht möglich. Hier erfährst du, wie du uns unterstützen kannst – sei es an Verpflegungsstationen, bei der Streckenmarkierung oder im Zielbereich. Melde dich an, bring Freunde mit und erlebe die besondere Atmosphäre unserer Veranstaltung aus einer ganz neuen Perspektive.' },
    { key: 'volunteersButton', value: 'Helfer werden' },
    { key: 'logoTagline', value: 'POWERED BY Agence Steve Greisch' },
    { key: 'navInfo', value: 'Info' },
    { key: 'navRoutes', value: 'Strecken' },
    { key: 'navRoutesKids', value: 'Kids A/B' },
    { key: 'navRoutesYouthB', value: 'Youth B/C' },
    { key: 'navRoutesElite', value: 'Elite/AK/Relais' },
    { key: 'navRoutesYouthA', value: 'Youth A/Promo/Juniors' },
    { key: 'navArchive', value: 'Archiv' },
    { key: 'navSponsors', value: 'Sponsoren' },
    { key: 'navVolunteers', value: 'Helfer' },
    { key: 'navContact', value: 'Kontakt' },
    { key: 'footerAboutTitle', value: 'Über das Event' },
    { key: 'footerAboutText', value: 'Die nationale Duathlon-Meisterschaft ist die wichtigste Veranstaltung in Luxemburg, bei der Laufen und Radfahren kombiniert werden. Kämpfen Sie um den nationalen Titel in einem unvergesslichen Rennen durch Junglinsters wunderschöne Landschaften.' },
    { key: 'footerInfoTitle', value: 'Infos zum Event' },
    { key: 'footerInfoProgram', value: 'Programm' },
    { key: 'footerInfoRegister', value: 'Jetzt anmelden' },
    { key: 'footerInfoCourses', value: 'Strecken' },
    { key: 'footerContactTitle', value: 'Kontakt' },
    { key: 'footerContactText', value: 'Wenn Sie Fragen haben oder weitere Informationen benötigen, können Sie uns gerne kontaktieren:' },
    { key: 'footerFollowTitle', value: 'Folgt uns' },
    { key: 'footerFollowText', value: 'Bleiben Sie über die neuesten Nachrichten und Veranstaltungsinformationen über unsere Social-Media-Kanäle auf dem Laufenden.' },
    { key: 'footerCopyright', value: '© 2025 KARIBU a.s.b.l. Alle Rechte vorbehalten.' }
  ],
  lastUpdated: new Date()
};

const homeDataFr = {
  language: 'fr',
  page: 'home',
  sections: [
    { key: 'heroTitle', value: 'Lënster Duathlon' },
    { key: 'heroDescription', value: 'Rejoignez-nous pour une combinaison passionnante de course à pied et de cyclisme au cœur de la magnifique commune de Junglinster.' },
    { key: 'ctaButton', value: 'Enregistrer' },
    { key: 'countDownTitleDays', value: 'Jours' },
    { key: 'countDownTitleHours', value: 'Heures' },
    { key: 'countDownTitleMinutes', value: 'Minutes' },
    { key: 'countDownTitleSeconds', value: 'Secondes' },
    { key: 'sponsorsTitle', value: 'Nos Sponsors' },
    { key: 'infoTitle', value: 'Infos' },
    { key: 'infoDescription', value: "Tout ce que vous devez savoir pour votre journée de compétition réussie : horaires, heures de départ, modalités d'inscription, frais de participation et règlement." },
    { key: 'infoButton', value: 'Infos' },
    { key: 'coursesTitle', value: 'Parcours' },
    { key: 'coursesDescription', value: "Découvrez nos parcours stimulants et pittoresques pour les athlètes de tous niveaux. Du parcours cycliste exigeant avec ses vues panoramiques au parcours de course varié à travers des paysages pittoresques - vous trouverez ici des plans détaillés, des profils d'élévation et des données GPS pour une expérience de course optimale." },
    { key: 'coursesButton', value: 'Parcours' },
    { key: 'volunteersTitle', value: 'Bénévoles' },
    { key: 'volunteersDescription', value: "Devenez membre de notre équipe dévouée ! Sans nos fantastiques bénévoles, ce duathlon ne serait pas possible. Découvrez ici comment vous pouvez nous soutenir - que ce soit aux postes de ravitaillement, au balisage du parcours ou dans la zone d'arrivée. Inscrivez-vous, amenez des amis et vivez l'atmosphère spéciale de notre événement sous un tout nouvel angle." },
    { key: 'volunteersButton', value: 'Devenir bénévole' },
    { key: 'logoTagline', value: 'POWERED BY Agence Steve Greisch' },
    { key: 'navInfo', value: 'Infos' },
    { key: 'navRoutes', value: 'Parcours' },
    { key: 'navRoutesKids', value: 'Kids A/B' },
    { key: 'navRoutesYouthB', value: 'Youth B/C' },
    { key: 'navRoutesElite', value: 'Elite/AK/Relais' },
    { key: 'navRoutesYouthA', value: 'Youth A/Promo/Juniors' },
    { key: 'navArchive', value: 'Archives' },
    { key: 'navSponsors', value: 'Sponsors' },
    { key: 'navVolunteers', value: 'Bénévoles' },
    { key: 'navContact', value: 'Contact' },
    { key: 'footerAboutTitle', value: "À propos de l'événement" },
    { key: 'footerAboutText', value: "Le championnat national de duathlon est l'événement le plus important au Luxembourg qui combine course à pied et cyclisme. Disputez le titre national lors d'une course inoubliable à travers les magnifiques paysages de Junglinster." },
    { key: 'footerInfoTitle', value: "Informations sur l'événement" },
    { key: 'footerInfoProgram', value: 'Programme' },
    { key: 'footerInfoRegister', value: "S'inscrire maintenant" },
    { key: 'footerInfoCourses', value: 'Parcours' },
    { key: 'footerContactTitle', value: 'Contact' },
    { key: 'footerContactText', value: "Si vous avez des questions ou besoin de plus d'informations, n'hésitez pas à nous contacter:" },
    { key: 'footerFollowTitle', value: 'Suivez-nous' },
    { key: 'footerFollowText', value: "Restez informé des dernières nouvelles et informations sur l'événement via nos réseaux sociaux." },
    { key: 'footerCopyright', value: '© 2025 KARIBU a.s.b.l. Tous droits réservés.' }
  ],
  lastUpdated: new Date()
};

// Kids Distance Page Translations (uses shortDistanceTitle/Description in view)
const kidsDistanceDataEn = {
  language: 'en',
  page: 'kidsDistance',
  sections: [
    { key: 'shortDistanceTitle', value: 'Kids A/B Course' },
    { key: 'shortDistanceDescription', value: 'A challenging course with 1 km running, 5 km cycling, and 0.5 km running through picturesque landscapes and challenging terrain.' },
    { key: 'courseDetailsButton', value: 'Course Details' },
    { key: 'gpsDownloadButton', value: 'Download GPS Data' },
    { key: 'courseOverviewTitle', value: 'Course Overview' },
    { key: 'generalInfoTitle', value: 'General Information' },
    { key: 'surfaceTitle', value: 'Surface' },
    { key: 'surfaceDescription', value: 'Running course: 100% asphalt, well-maintained roads. Cycling course: 100% asphalt, well-maintained roads' },
    { key: 'difficultyTitle', value: 'Course Difficulty' },
    { key: 'difficultyDescription', value: 'Running: Medium / Cycling: Medium-Hard' },
    { key: 'transitionTitle', value: 'Transition Area' },
    { key: 'transitionDescription', value: 'Centrally located at the main square with ample space and good organization.' },
    { key: 'firstRunTitle', value: 'First Run' },
    { key: 'firstRunDistance', value: '1 km' },
    { key: 'firstRunLaps', value: '1 lap (GT)' },
    { key: 'cyclingTitle', value: 'Cycling' },
    { key: 'cyclingDistance', value: '5 km' },
    { key: 'cyclingLaps', value: '1 lap' },
    { key: 'secondRunTitle', value: 'Second Run' },
    { key: 'secondRunDistance', value: '0.5 km' },
    { key: 'secondRunLaps', value: '1 lap (PT)' },
    { key: 'elevationTitle', value: 'Elevation Gain' },
    { key: 'elevationAmount', value: '37 m' },
    { key: 'keyNotesTitle', value: 'Key Notes' },
    { key: 'keyNoteHelmet', value: 'Helmet is mandatory on the cycling course. No exceptions.' },
    { key: 'keyNoteDrafting', value: 'Drafting is allowed on the cycling course.' },
    { key: 'keyNoteTiming', value: 'Timing is done with a chip that must be worn on the ankle.' },
    { key: 'keyNoteTransition', value: 'At the transition area, all participants must dismount and push their bikes.' },
    { key: 'coursesTitle', value: 'Courses' },
    { key: 'cyclingRouteTitle', value: 'Cycling Route' },
    { key: 'runningRouteTitle', value: 'Running Route' },
    { key: 'grandTourTitle', value: 'Grand Tour (GT)' },
    { key: 'petitTourTitle', value: 'Petit Tour (PT)' }
  ],
  lastUpdated: new Date()
};

const kidsDistanceDataDe = {
  language: 'de',
  page: 'kidsDistance',
  sections: [
    { key: 'shortDistanceTitle', value: 'Kids A/B Strecke' },
    { key: 'shortDistanceDescription', value: 'Ein anspruchsvoller Kurs mit 1 km Laufen, 5 km Radfahren und 0.5 km Laufen durch malerische Landschaften und herausforderndes Terrain.' },
    { key: 'courseDetailsButton', value: 'Streckendetails' },
    { key: 'gpsDownloadButton', value: 'GPS-Daten herunterladen' },
    { key: 'courseOverviewTitle', value: 'Streckenübersicht' },
    { key: 'generalInfoTitle', value: 'Allgemeine Information' },
    { key: 'surfaceTitle', value: 'Oberfläche' },
    { key: 'surfaceDescription', value: 'Laufstrecke: 100% Asphalt, gut gepflegte Straßen. Radstrecke: 100% Asphalt, gut gepflegte Straßen' },
    { key: 'difficultyTitle', value: 'Streckenschwierigkeit' },
    { key: 'difficultyDescription', value: 'Laufen: Mittel / Radfahren: Mittel-Schwer' },
    { key: 'transitionTitle', value: 'Wechselzone' },
    { key: 'transitionDescription', value: 'Zentral gelegen am Hauptplatz mit ausreichend Platz und guter Organisation.' },
    { key: 'firstRunTitle', value: 'Erster Lauf' },
    { key: 'firstRunDistance', value: '1 km' },
    { key: 'firstRunLaps', value: '1 Runde (GT)' },
    { key: 'cyclingTitle', value: 'Radfahren' },
    { key: 'cyclingDistance', value: '5 km' },
    { key: 'cyclingLaps', value: '1 Runde' },
    { key: 'secondRunTitle', value: 'Zweiter Lauf' },
    { key: 'secondRunDistance', value: '0.5 km' },
    { key: 'secondRunLaps', value: '1 Runde (PT)' },
    { key: 'elevationTitle', value: 'Höhenunterschied' },
    { key: 'elevationAmount', value: '37 m' },
    { key: 'keyNotesTitle', value: 'Wichtige Hinweise' },
    { key: 'keyNoteHelmet', value: 'Helmpflicht auf der Radstrecke. Keine Ausnahmen.' },
    { key: 'keyNoteDrafting', value: 'Drafting ist auf der Radstrecke erlaubt.' },
    { key: 'keyNoteTiming', value: 'Die Zeitnahme erfolgt per Chip, der am Knöchel zu tragen ist.' },
    { key: 'keyNoteTransition', value: 'Bei der Wechselzone müssen alle Teilnehmer vom Rad absteigen und das Rad schieben.' },
    { key: 'coursesTitle', value: 'Strecken' },
    { key: 'cyclingRouteTitle', value: 'Radstrecke' },
    { key: 'runningRouteTitle', value: 'Laufstrecke' },
    { key: 'grandTourTitle', value: 'Grand Tour (GT)' },
    { key: 'petitTourTitle', value: 'Petit Tour (PT)' }
  ],
  lastUpdated: new Date()
};

const kidsDistanceDataFr = {
  language: 'fr',
  page: 'kidsDistance',
  sections: [
    { key: 'shortDistanceTitle', value: 'Kids A/B Parcours' },
    { key: 'shortDistanceDescription', value: 'Un parcours exigeant avec 1 km de course à pied, 5 km de cyclisme et 0,5 km de course à pied à travers des paysages pittoresques et un terrain difficile.' },
    { key: 'courseDetailsButton', value: 'Détails du parcours' },
    { key: 'gpsDownloadButton', value: 'Télécharger les données GPS' },
    { key: 'courseOverviewTitle', value: 'Aperçu du parcours' },
    { key: 'generalInfoTitle', value: 'Informations générales' },
    { key: 'surfaceTitle', value: 'Surface' },
    { key: 'surfaceDescription', value: 'Parcours de course à pied: 100% asphalte, routes bien entretenues. Parcours cycliste: 100% asphalte, routes bien entretenues' },
    { key: 'difficultyTitle', value: 'Difficulté du parcours' },
    { key: 'difficultyDescription', value: 'Course à pied: Moyenne / Cyclisme: Moyenne-Difficile' },
    { key: 'transitionTitle', value: 'Zone de transition' },
    { key: 'transitionDescription', value: "Située au centre de la place principale avec suffisamment d'espace et une bonne organisation." },
    { key: 'firstRunTitle', value: 'Première course' },
    { key: 'firstRunDistance', value: '1 km' },
    { key: 'firstRunLaps', value: '1 tour (GT)' },
    { key: 'cyclingTitle', value: 'Cyclisme' },
    { key: 'cyclingDistance', value: '5 km' },
    { key: 'cyclingLaps', value: '1 tour' },
    { key: 'secondRunTitle', value: 'Deuxième course' },
    { key: 'secondRunDistance', value: '0,5 km' },
    { key: 'secondRunLaps', value: '1 tour (PT)' },
    { key: 'elevationTitle', value: 'Dénivelé' },
    { key: 'elevationAmount', value: '37 m' },
    { key: 'keyNotesTitle', value: 'Remarques importantes' },
    { key: 'keyNoteHelmet', value: 'Le casque est obligatoire sur le parcours cycliste. Aucune exception.' },
    { key: 'keyNoteDrafting', value: 'Le drafting est autorisé sur le parcours cycliste.' },
    { key: 'keyNoteTiming', value: 'Le chronométrage se fait avec une puce qui doit être portée à la cheville.' },
    { key: 'keyNoteTransition', value: 'Dans la zone de transition, tous les participants doivent descendre du vélo et le pousser.' },
    { key: 'coursesTitle', value: 'Parcours' },
    { key: 'cyclingRouteTitle', value: 'Parcours cycliste' },
    { key: 'runningRouteTitle', value: 'Parcours de course à pied' },
    { key: 'grandTourTitle', value: 'Grand Tour (GT)' },
    { key: 'petitTourTitle', value: 'Petit Tour (PT)' }
  ],
  lastUpdated: new Date()
};

// Short Distance Page Translations (Youth B/C)
const shortDistanceDataEn = {
  language: 'en',
  page: 'shortDistance',
  sections: [
    { key: 'shortDistanceTitle', value: 'Youth B/C Course' },
    { key: 'shortDistanceDescription', value: 'A challenging course with 2.5 km running, 9.5 km cycling, and 1.25 km running through picturesque landscapes and challenging terrain.' },
    { key: 'courseDetailsButton', value: 'Course Details' },
    { key: 'gpsDownloadButton', value: 'Download GPS Data' },
    { key: 'courseOverviewTitle', value: 'Course Overview' },
    { key: 'generalInfoTitle', value: 'General Information' },
    { key: 'surfaceTitle', value: 'Surface' },
    { key: 'surfaceDescription', value: 'Running course: 100% asphalt, well-maintained roads. Cycling course: 100% asphalt, well-maintained roads' },
    { key: 'difficultyTitle', value: 'Course Difficulty' },
    { key: 'difficultyDescription', value: 'Running: Medium / Cycling: Medium-Hard' },
    { key: 'transitionTitle', value: 'Transition Area' },
    { key: 'transitionDescription', value: 'Centrally located at the main square with ample space and good organization.' },
    { key: 'firstRunTitle', value: 'First Run' },
    { key: 'firstRunDistance', value: '2.5 km' },
    { key: 'firstRunLaps', value: '1 lap (GT)' },
    { key: 'cyclingTitle', value: 'Cycling' },
    { key: 'cyclingDistance', value: '9.5 km' },
    { key: 'cyclingLaps', value: '1 lap' },
    { key: 'secondRunTitle', value: 'Second Run' },
    { key: 'secondRunDistance', value: '1.25 km' },
    { key: 'secondRunLaps', value: '1 lap (PT)' },
    { key: 'elevationTitle', value: 'Elevation Gain' },
    { key: 'elevationAmount', value: '608 m' },
    { key: 'keyNotesTitle', value: 'Key Notes' },
    { key: 'keyNoteHelmet', value: 'Helmet is mandatory on the cycling course. No exceptions.' },
    { key: 'keyNoteDrafting', value: 'Drafting is allowed on the cycling course.' },
    { key: 'keyNoteTiming', value: 'Timing is done with a chip that must be worn on the ankle.' },
    { key: 'keyNoteTransition', value: 'At the transition area, all participants must dismount and push their bikes.' },
    { key: 'coursesTitle', value: 'Courses' },
    { key: 'cyclingRouteTitle', value: 'Cycling Route' },
    { key: 'runningRouteTitle', value: 'Running Route' },
    { key: 'grandTourTitle', value: 'Grand Tour (GT)' },
    { key: 'petitTourTitle', value: 'Petit Tour (PT)' }
  ],
  lastUpdated: new Date()
};

const shortDistanceDataDe = {
  language: 'de',
  page: 'shortDistance',
  sections: [
    { key: 'shortDistanceTitle', value: 'Youth B/C Strecke' },
    { key: 'shortDistanceDescription', value: 'Ein anspruchsvoller Kurs mit 2.5 km Laufen, 9.5 km Radfahren und 1.25 km Laufen durch malerische Landschaften und herausforderndes Terrain.' },
    { key: 'courseDetailsButton', value: 'Streckendetails' },
    { key: 'gpsDownloadButton', value: 'GPS-Daten herunterladen' },
    { key: 'courseOverviewTitle', value: 'Streckenübersicht' },
    { key: 'generalInfoTitle', value: 'Allgemeine Information' },
    { key: 'surfaceTitle', value: 'Oberfläche' },
    { key: 'surfaceDescription', value: 'Laufstrecke: 100% Asphalt, gut gepflegte Straßen. Radstrecke: 100% Asphalt, gut gepflegte Straßen' },
    { key: 'difficultyTitle', value: 'Streckenschwierigkeit' },
    { key: 'difficultyDescription', value: 'Laufen: Mittel / Radfahren: Mittel-Schwer' },
    { key: 'transitionTitle', value: 'Wechselzone' },
    { key: 'transitionDescription', value: 'Zentral gelegen am Hauptplatz mit ausreichend Platz und guter Organisation.' },
    { key: 'firstRunTitle', value: 'Erster Lauf' },
    { key: 'firstRunDistance', value: '2.5 km' },
    { key: 'firstRunLaps', value: '1 Runde (GT)' },
    { key: 'cyclingTitle', value: 'Radfahren' },
    { key: 'cyclingDistance', value: '9.5 km' },
    { key: 'cyclingLaps', value: '1 Runde' },
    { key: 'secondRunTitle', value: 'Zweiter Lauf' },
    { key: 'secondRunDistance', value: '1.25 km' },
    { key: 'secondRunLaps', value: '1 Runde (PT)' },
    { key: 'elevationTitle', value: 'Höhenunterschied' },
    { key: 'elevationAmount', value: '608 m' },
    { key: 'keyNotesTitle', value: 'Wichtige Hinweise' },
    { key: 'keyNoteHelmet', value: 'Helmpflicht auf der Radstrecke. Keine Ausnahmen.' },
    { key: 'keyNoteDrafting', value: 'Drafting ist auf der Radstrecke erlaubt.' },
    { key: 'keyNoteTiming', value: 'Die Zeitnahme erfolgt per Chip, der am Knöchel zu tragen ist.' },
    { key: 'keyNoteTransition', value: 'Bei der Wechselzone müssen alle Teilnehmer vom Rad absteigen und das Rad schieben.' },
    { key: 'coursesTitle', value: 'Strecken' },
    { key: 'cyclingRouteTitle', value: 'Radstrecke' },
    { key: 'runningRouteTitle', value: 'Laufstrecke' },
    { key: 'grandTourTitle', value: 'Grand Tour (GT)' },
    { key: 'petitTourTitle', value: 'Petit Tour (PT)' }
  ],
  lastUpdated: new Date()
};

const shortDistanceDataFr = {
  language: 'fr',
  page: 'shortDistance',
  sections: [
    { key: 'shortDistanceTitle', value: 'Youth B/C Parcours' },
    { key: 'shortDistanceDescription', value: 'Un parcours exigeant avec 2,5 km de course à pied, 9,5 km de cyclisme et 1,25 km de course à pied à travers des paysages pittoresques et un terrain difficile.' },
    { key: 'courseDetailsButton', value: 'Détails du parcours' },
    { key: 'gpsDownloadButton', value: 'Télécharger les données GPS' },
    { key: 'courseOverviewTitle', value: 'Aperçu du parcours' },
    { key: 'generalInfoTitle', value: 'Informations générales' },
    { key: 'surfaceTitle', value: 'Surface' },
    { key: 'surfaceDescription', value: 'Parcours de course à pied: 100% asphalte, routes bien entretenues. Parcours cycliste: 100% asphalte, routes bien entretenues' },
    { key: 'difficultyTitle', value: 'Difficulté du parcours' },
    { key: 'difficultyDescription', value: 'Course à pied: Moyenne / Cyclisme: Moyenne-Difficile' },
    { key: 'transitionTitle', value: 'Zone de transition' },
    { key: 'transitionDescription', value: "Située au centre de la place principale avec suffisamment d'espace et une bonne organisation." },
    { key: 'firstRunTitle', value: 'Première course' },
    { key: 'firstRunDistance', value: '2,5 km' },
    { key: 'firstRunLaps', value: '1 tour (GT)' },
    { key: 'cyclingTitle', value: 'Cyclisme' },
    { key: 'cyclingDistance', value: '9,5 km' },
    { key: 'cyclingLaps', value: '1 tour' },
    { key: 'secondRunTitle', value: 'Deuxième course' },
    { key: 'secondRunDistance', value: '1,25 km' },
    { key: 'secondRunLaps', value: '1 tour (PT)' },
    { key: 'elevationTitle', value: 'Dénivelé' },
    { key: 'elevationAmount', value: '608 m' },
    { key: 'keyNotesTitle', value: 'Remarques importantes' },
    { key: 'keyNoteHelmet', value: 'Le casque est obligatoire sur le parcours cycliste. Aucune exception.' },
    { key: 'keyNoteDrafting', value: 'Le drafting est autorisé sur le parcours cycliste.' },
    { key: 'keyNoteTiming', value: 'Le chronométrage se fait avec une puce qui doit être portée à la cheville.' },
    { key: 'keyNoteTransition', value: 'Dans la zone de transition, tous les participants doivent descendre du vélo et le pousser.' },
    { key: 'coursesTitle', value: 'Parcours' },
    { key: 'cyclingRouteTitle', value: 'Parcours cycliste' },
    { key: 'runningRouteTitle', value: 'Parcours de course à pied' },
    { key: 'grandTourTitle', value: 'Grand Tour (GT)' },
    { key: 'petitTourTitle', value: 'Petit Tour (PT)' }
  ],
  lastUpdated: new Date()
};

// Middle Distance Page Translations (Youth A/Promo/Juniors) - uses "title" in view
const middleDistanceDataEn = {
  language: 'en',
  page: 'middleDistance',
  sections: [
    { key: 'title', value: 'Youth A/Promo/Juniors Course' },
    { key: 'courseDetailsButton', value: 'Course Details' },
    { key: 'gpsDownloadButton', value: 'Download GPS Data' },
    { key: 'courseOverviewTitle', value: 'Course Overview' },
    { key: 'generalInfoTitle', value: 'General Information' },
    { key: 'surfaceTitle', value: 'Surface' },
    { key: 'surfaceDescription', value: 'Running course: 100% asphalt, well-maintained roads. Cycling course: 100% asphalt, well-maintained roads' },
    { key: 'difficultyTitle', value: 'Course Difficulty' },
    { key: 'difficultyDescription', value: 'Running: Medium / Cycling: Medium-Hard' },
    { key: 'transitionTitle', value: 'Transition Area' },
    { key: 'transitionDescription', value: 'Centrally located at the main square with ample space and good organization.' },
    { key: 'firstRunTitle', value: 'First Run' },
    { key: 'firstRunDistance', value: '5 km' },
    { key: 'firstRunLaps', value: '2 laps' },
    { key: 'cyclingTitle', value: 'Cycling' },
    { key: 'cyclingDistance', value: '19 km' },
    { key: 'cyclingLaps', value: '2 laps' },
    { key: 'secondRunTitle', value: 'Second Run' },
    { key: 'secondRunDistance', value: '2.5 km' },
    { key: 'secondRunLaps', value: '1 lap' },
    { key: 'elevationTitle', value: 'Elevation Gain' },
    { key: 'elevationAmount', value: '304 m' },
    { key: 'keyNotesTitle', value: 'Key Notes' },
    { key: 'keyNoteHelmet', value: 'Helmet is mandatory on the cycling course. No exceptions.' },
    { key: 'keyNoteDrafting', value: 'Drafting is allowed on the cycling course.' },
    { key: 'keyNoteTiming', value: 'Timing is done with a chip that must be worn on the ankle.' },
    { key: 'keyNoteTransition', value: 'At the transition area, all participants must dismount and push their bikes.' },
    { key: 'coursesTitle', value: 'Courses' },
    { key: 'cyclingRouteTitle', value: 'Cycling Route' },
    { key: 'runningRouteTitle', value: 'Running Route' }
  ],
  lastUpdated: new Date()
};

const middleDistanceDataDe = {
  language: 'de',
  page: 'middleDistance',
  sections: [
    { key: 'title', value: 'Youth A/Promo/Juniors Strecke' },
    { key: 'courseDetailsButton', value: 'Streckendetails' },
    { key: 'gpsDownloadButton', value: 'GPS-Daten herunterladen' },
    { key: 'courseOverviewTitle', value: 'Streckenübersicht' },
    { key: 'generalInfoTitle', value: 'Allgemeine Information' },
    { key: 'surfaceTitle', value: 'Oberfläche' },
    { key: 'surfaceDescription', value: 'Laufstrecke: 100% Asphalt, gut gepflegte Straßen. Radstrecke: 100% Asphalt, gut gepflegte Straßen' },
    { key: 'difficultyTitle', value: 'Streckenschwierigkeit' },
    { key: 'difficultyDescription', value: 'Laufen: Mittel / Radfahren: Mittel-Schwer' },
    { key: 'transitionTitle', value: 'Wechselzone' },
    { key: 'transitionDescription', value: 'Zentral gelegen am Hauptplatz mit ausreichend Platz und guter Organisation.' },
    { key: 'firstRunTitle', value: 'Erster Lauf' },
    { key: 'firstRunDistance', value: '5 km' },
    { key: 'firstRunLaps', value: '2 Runden' },
    { key: 'cyclingTitle', value: 'Radfahren' },
    { key: 'cyclingDistance', value: '19 km' },
    { key: 'cyclingLaps', value: '2 Runden' },
    { key: 'secondRunTitle', value: 'Zweiter Lauf' },
    { key: 'secondRunDistance', value: '2.5 km' },
    { key: 'secondRunLaps', value: '1 Runde' },
    { key: 'elevationTitle', value: 'Höhenunterschied' },
    { key: 'elevationAmount', value: '304 m' },
    { key: 'keyNotesTitle', value: 'Wichtige Hinweise' },
    { key: 'keyNoteHelmet', value: 'Helmpflicht auf der Radstrecke. Keine Ausnahmen.' },
    { key: 'keyNoteDrafting', value: 'Drafting ist auf der Radstrecke erlaubt.' },
    { key: 'keyNoteTiming', value: 'Die Zeitnahme erfolgt per Chip, der am Knöchel zu tragen ist.' },
    { key: 'keyNoteTransition', value: 'Bei der Wechselzone müssen alle Teilnehmer vom Rad absteigen und das Rad schieben.' },
    { key: 'coursesTitle', value: 'Strecken' },
    { key: 'cyclingRouteTitle', value: 'Radstrecke' },
    { key: 'runningRouteTitle', value: 'Laufstrecke' }
  ],
  lastUpdated: new Date()
};

const middleDistanceDataFr = {
  language: 'fr',
  page: 'middleDistance',
  sections: [
    { key: 'title', value: 'Youth A/Promo/Juniors Parcours' },
    { key: 'courseDetailsButton', value: 'Détails du parcours' },
    { key: 'gpsDownloadButton', value: 'Télécharger les données GPS' },
    { key: 'courseOverviewTitle', value: 'Aperçu du parcours' },
    { key: 'generalInfoTitle', value: 'Informations générales' },
    { key: 'surfaceTitle', value: 'Surface' },
    { key: 'surfaceDescription', value: 'Parcours de course à pied: 100% asphalte, routes bien entretenues. Parcours cycliste: 100% asphalte, routes bien entretenues' },
    { key: 'difficultyTitle', value: 'Difficulté du parcours' },
    { key: 'difficultyDescription', value: 'Course à pied: Moyenne / Cyclisme: Moyenne-Difficile' },
    { key: 'transitionTitle', value: 'Zone de transition' },
    { key: 'transitionDescription', value: "Située au centre de la place principale avec suffisamment d'espace et une bonne organisation." },
    { key: 'firstRunTitle', value: 'Première course' },
    { key: 'firstRunDistance', value: '5 km' },
    { key: 'firstRunLaps', value: '2 tours' },
    { key: 'cyclingTitle', value: 'Cyclisme' },
    { key: 'cyclingDistance', value: '19 km' },
    { key: 'cyclingLaps', value: '2 tours' },
    { key: 'secondRunTitle', value: 'Deuxième course' },
    { key: 'secondRunDistance', value: '2,5 km' },
    { key: 'secondRunLaps', value: '1 tour' },
    { key: 'elevationTitle', value: 'Dénivelé' },
    { key: 'elevationAmount', value: '304 m' },
    { key: 'keyNotesTitle', value: 'Remarques importantes' },
    { key: 'keyNoteHelmet', value: 'Le casque est obligatoire sur le parcours cycliste. Aucune exception.' },
    { key: 'keyNoteDrafting', value: 'Le drafting est autorisé sur le parcours cycliste.' },
    { key: 'keyNoteTiming', value: 'Le chronométrage se fait avec une puce qui doit être portée à la cheville.' },
    { key: 'keyNoteTransition', value: 'Dans la zone de transition, tous les participants doivent descendre du vélo et le pousser.' },
    { key: 'coursesTitle', value: 'Parcours' },
    { key: 'cyclingRouteTitle', value: 'Parcours cycliste' },
    { key: 'runningRouteTitle', value: 'Parcours de course à pied' }
  ],
  lastUpdated: new Date()
};

// Long Distance Page Translations (Elite/AK/Relay)
const longDistanceDataEn = {
  language: 'en',
  page: 'longDistance',
  sections: [
    { key: 'longDistanceTitle', value: 'Elite/AK/Relay Course' },
    { key: 'longDistanceDescription', value: 'A challenging course with 10 km running, 38.5 km cycling, and 5 km running through picturesque landscapes and challenging terrain.' },
    { key: 'courseDetailsButton', value: 'Course Details' },
    { key: 'gpsDownloadButton', value: 'Download GPS Data' },
    { key: 'courseOverviewTitle', value: 'Course Overview' },
    { key: 'generalInfoTitle', value: 'General Information' },
    { key: 'surfaceTitle', value: 'Surface' },
    { key: 'surfaceDescription', value: 'Running course: 100% asphalt, well-maintained roads. Cycling course: 100% asphalt, well-maintained roads' },
    { key: 'difficultyTitle', value: 'Course Difficulty' },
    { key: 'difficultyDescription', value: 'Running: Medium / Cycling: Medium-Hard' },
    { key: 'transitionTitle', value: 'Transition Area' },
    { key: 'transitionDescription', value: 'Centrally located at the main square with ample space and good organization.' },
    { key: 'firstRunTitle', value: 'First Run' },
    { key: 'firstRunDistance', value: '10 km' },
    { key: 'firstRunLaps', value: '4 laps' },
    { key: 'cyclingTitle', value: 'Cycling' },
    { key: 'cyclingDistance', value: '38.5 km' },
    { key: 'cyclingLaps', value: '4 laps' },
    { key: 'secondRunTitle', value: 'Second Run' },
    { key: 'secondRunDistance', value: '5 km' },
    { key: 'secondRunLaps', value: '2 laps' },
    { key: 'elevationTitle', value: 'Elevation Gain' },
    { key: 'elevationAmount', value: '608 m' },
    { key: 'keyNotesTitle', value: 'Key Notes' },
    { key: 'keyNoteHelmet', value: 'Helmet is mandatory on the cycling course. No exceptions.' },
    { key: 'keyNoteDrafting', value: 'Drafting is allowed on the cycling course.' },
    { key: 'keyNoteTiming', value: 'Timing is done with a chip that must be worn on the ankle.' },
    { key: 'keyNoteTransition', value: 'At the transition area, all participants must dismount and push their bikes.' },
    { key: 'coursesTitle', value: 'Courses' },
    { key: 'cyclingRouteTitle', value: 'Cycling Route' },
    { key: 'runningRouteTitle', value: 'Running Route' }
  ],
  lastUpdated: new Date()
};

const longDistanceDataDe = {
  language: 'de',
  page: 'longDistance',
  sections: [
    { key: 'longDistanceTitle', value: 'Elite/AK/Relais Strecke' },
    { key: 'longDistanceDescription', value: 'Ein anspruchsvoller Kurs mit 10 km Laufen, 38.5 km Radfahren und 5 km Laufen durch malerische Landschaften und herausforderndes Terrain.' },
    { key: 'courseDetailsButton', value: 'Streckendetails' },
    { key: 'gpsDownloadButton', value: 'GPS-Daten herunterladen' },
    { key: 'courseOverviewTitle', value: 'Streckenübersicht' },
    { key: 'generalInfoTitle', value: 'Allgemeine Information' },
    { key: 'surfaceTitle', value: 'Oberfläche' },
    { key: 'surfaceDescription', value: 'Laufstrecke: 100% Asphalt, gut gepflegte Straßen. Radstrecke: 100% Asphalt, gut gepflegte Straßen' },
    { key: 'difficultyTitle', value: 'Streckenschwierigkeit' },
    { key: 'difficultyDescription', value: 'Laufen: Mittel / Radfahren: Mittel-Schwer' },
    { key: 'transitionTitle', value: 'Wechselzone' },
    { key: 'transitionDescription', value: 'Zentral gelegen am Hauptplatz mit ausreichend Platz und guter Organisation.' },
    { key: 'firstRunTitle', value: 'Erster Lauf' },
    { key: 'firstRunDistance', value: '10 km' },
    { key: 'firstRunLaps', value: '4 Runden' },
    { key: 'cyclingTitle', value: 'Radfahren' },
    { key: 'cyclingDistance', value: '38.5 km' },
    { key: 'cyclingLaps', value: '4 Runden' },
    { key: 'secondRunTitle', value: 'Zweiter Lauf' },
    { key: 'secondRunDistance', value: '5 km' },
    { key: 'secondRunLaps', value: '2 Runden' },
    { key: 'elevationTitle', value: 'Höhenunterschied' },
    { key: 'elevationAmount', value: '608 m' },
    { key: 'keyNotesTitle', value: 'Wichtige Hinweise' },
    { key: 'keyNoteHelmet', value: 'Helmpflicht auf der Radstrecke. Keine Ausnahmen.' },
    { key: 'keyNoteDrafting', value: 'Drafting ist auf der Radstrecke erlaubt.' },
    { key: 'keyNoteTiming', value: 'Die Zeitnahme erfolgt per Chip, der am Knöchel zu tragen ist.' },
    { key: 'keyNoteTransition', value: 'Bei der Wechselzone müssen alle Teilnehmer vom Rad absteigen und das Rad schieben.' },
    { key: 'coursesTitle', value: 'Strecken' },
    { key: 'cyclingRouteTitle', value: 'Radstrecke' },
    { key: 'runningRouteTitle', value: 'Laufstrecke' }
  ],
  lastUpdated: new Date()
};

const longDistanceDataFr = {
  language: 'fr',
  page: 'longDistance',
  sections: [
    { key: 'longDistanceTitle', value: 'Elite/AK/Relais Parcours' },
    { key: 'longDistanceDescription', value: 'Un parcours exigeant avec 10 km de course à pied, 38,5 km de cyclisme et 5 km de course à pied à travers des paysages pittoresques et un terrain difficile.' },
    { key: 'courseDetailsButton', value: 'Détails du parcours' },
    { key: 'gpsDownloadButton', value: 'Télécharger les données GPS' },
    { key: 'courseOverviewTitle', value: 'Aperçu du parcours' },
    { key: 'generalInfoTitle', value: 'Informations générales' },
    { key: 'surfaceTitle', value: 'Surface' },
    { key: 'surfaceDescription', value: 'Parcours de course à pied: 100% asphalte, routes bien entretenues. Parcours cycliste: 100% asphalte, routes bien entretenues' },
    { key: 'difficultyTitle', value: 'Difficulté du parcours' },
    { key: 'difficultyDescription', value: 'Course à pied: Moyenne / Cyclisme: Moyenne-Difficile' },
    { key: 'transitionTitle', value: 'Zone de transition' },
    { key: 'transitionDescription', value: "Située au centre de la place principale avec suffisamment d'espace et une bonne organisation." },
    { key: 'firstRunTitle', value: 'Première course' },
    { key: 'firstRunDistance', value: '10 km' },
    { key: 'firstRunLaps', value: '4 tours' },
    { key: 'cyclingTitle', value: 'Cyclisme' },
    { key: 'cyclingDistance', value: '38,5 km' },
    { key: 'cyclingLaps', value: '4 tours' },
    { key: 'secondRunTitle', value: 'Deuxième course' },
    { key: 'secondRunDistance', value: '5 km' },
    { key: 'secondRunLaps', value: '2 tours' },
    { key: 'elevationTitle', value: 'Dénivelé' },
    { key: 'elevationAmount', value: '608 m' },
    { key: 'keyNotesTitle', value: 'Remarques importantes' },
    { key: 'keyNoteHelmet', value: 'Le casque est obligatoire sur le parcours cycliste. Aucune exception.' },
    { key: 'keyNoteDrafting', value: 'Le drafting est autorisé sur le parcours cycliste.' },
    { key: 'keyNoteTiming', value: 'Le chronométrage se fait avec une puce qui doit être portée à la cheville.' },
    { key: 'keyNoteTransition', value: 'Dans la zone de transition, tous les participants doivent descendre du vélo et le pousser.' },
    { key: 'coursesTitle', value: 'Parcours' },
    { key: 'cyclingRouteTitle', value: 'Parcours cycliste' },
    { key: 'runningRouteTitle', value: 'Parcours de course à pied' }
  ],
  lastUpdated: new Date()
};

const seedData = [
  {
    language: 'de',
    page: 'raceInfo',
    sections: [
      { key: 'quickNav', value: 'Schnellnavigation' },
      { key: 'quickNavTimeTable', value: 'Zeitplan' },
      { key: 'quickNavDirections', value: 'Anfahrt' },
      { key: 'quickNavRules', value: 'Regeln' },
      { key: 'quickNavScoring', value: 'Wertung' },
      { key: 'quickNavRegistration', value: 'Anmeldung' },
      { key: 'quickNavDistances', value: 'Distanzen' },
      { key: 'quickNavSponsors', value: 'Sponsoren' },
      { key: 'quickNavContact', value: 'Kontakt' },
      { key: 'raceInfoTitle', value: 'Renninformationen' },
      { key: 'timeTableTitle', value: 'Zeitplan' },
      { key: 'timeTableSubtitle', value: 'Zeitplan & Startzeiten' },
      { key: 'timeTableHeaderTime', value: 'Uhrzeit' },
      { key: 'timeTableHeaderProgram', value: 'Program' },
      { key: 'timeTableRaceKit', value: 'Ausgabe der Startunterlagen' },
      { key: 'timeTableCheckIn', value: 'Check-in & Technische Kontrolle' },
      { key: 'timeTableRace1', value: 'Start Rennen 1 (Youth A/ Juniors / Promo)' },
      { key: 'timeTableRace2', value: 'Start Rennen 2 (Elite / Age-groupers / Relais long)' },
      { key: 'timeTableAwardsRace1', value: 'Preisverleihung Rennen 1 (Youth A / Juniors / Promo)' },
      { key: 'timeTableRace3', value: 'Start Rennen 3 ( Youth B/C )' },
      { key: 'timeTableAwardsShortDist', value: 'Preisverleihung Rennen 3 (Youth B/C)' },
      { key: 'timeTableRace4', value: 'Start Rennen 4 ( Kids A )' },
      { key: 'timeTableRace5', value: 'Start Rennen 5 ( Kids B )' },
      { key: 'timeTableRace6', value: 'Start Rennen 6 (Bambinis)' },
      { key: 'timeTableAwardsKids', value: 'Preisverleihung Course 4 & 5 ( Kids A/B )' },
      { key: 'directionsTitle', value: 'ANFAHRT' },
      { key: 'directionsVenueTitle', value: 'Veranstaltungsort' },
      { key: 'directionsVenueParkRide', value: 'Park+Ride um Rossbuer' },
      { key: 'directionsVenueParkingOptions', value: 'Parkmöglichkeiten auf P+R' },
      { key: 'rulesTitle', value: 'REGELN' },
      { key: 'rulesSubtitle', value: 'Die bei dieser Veranstaltung geltenden Regel beinhaltend¹:' },
      { key: 'rulesDrafting', value: 'Renntyp: Drafting Race.' },
      { key: 'rulesHelmet', value: 'Helmpflicht für alle.' },
      { key: 'rulesInspection', value: 'Obligatorische technische Radkontrolle vor dem Check-In.' },
      { key: 'rulesMountainBike', value: 'Kinder haben das Recht, ein Mountainbike zu benutzen.' },
      { key: 'rulesLiability', value: 'Der Veranstalter haftet nicht für Diebstahl oder sonstige Straftaten.' },
      { key: 'rulesFullList', value: 'Für vollständige Liste bitte' },
      { key: 'rulesRulebook', value: 'Regelbuch der nationalen Triathlon Federation' },
      { key: 'rulesFootnote', value: '¹aber nicht limitiert zu.' },
      { key: 'scoringTitle', value: 'WERTUNG' },
      { key: 'scoringSubtitle', value: 'Preise & Wertung - DUATHLON 2025' },
      { key: 'scoringParticipation', value: 'Jeder Teilnehmer erhält ein Teilnahme-T-Shirt\nDie Bambinis erhalten alle eine Medaille' },
      { key: 'scoringElite', value: 'Elite M&F' },
      { key: 'scoringPlace', value: 'Platz' },
      { key: 'scoringPrize', value: 'Preis' },
      { key: 'scoringFirstPlace', value: 'Medaille + 150 €' },
      { key: 'scoringSecondPlace', value: 'Medaille + 130 €' },
      { key: 'scoringThirdPlace', value: 'Medaille + 110 €' },
      { key: 'scoringFourthPlace', value: 'Medaille + 90 €' },
      { key: 'scoringFifthPlace', value: 'Medaille + 80 €' },
      { key: 'scoringOtherCategories', value: 'Die ersten drei jeder Kategorie erhalten eine Medaille und ein Geschenk.' },
      { key: 'registrationTitle', value: 'ANMELDUNG' },
      { key: 'registrationSubtitle', value: 'Registration Details' },
      { key: 'registrationDayLicense', value: 'Tageslizenz für nicht lizenzierte möglich' },
      { key: 'registrationLateEntry', value: 'Nachmeldung vor Ort gegen 10 € Aufpreis.' },
      { key: 'registrationDeadline', value: 'Maximal bis 1 Stunde vor Rennbeginn.' },
      { key: 'registrationButton', value: 'Jetzt anmelden' },
      { key: 'distancesTitle', value: 'DISTANZEN' },
      { key: 'distancesSubtitle', value: 'Wettkampfdistanzen' },
      { key: 'distancesCategoryHeader', value: 'Kategorie' },
      { key: 'distancesFirstRunHeader', value: 'Erster Lauf' },
      { key: 'distancesCyclingHeader', value: 'Radfahren' },
      { key: 'distancesSecondRunHeader', value: 'Zweiter Lauf' },
      { key: 'distancesBambini', value: 'Bambinis Rennen 6' },
      { key: 'distancesKidsAB', value: 'Kids A / B (Rennen 4 & 5)' },
      { key: 'distancesYouthC', value: 'Youth C (Rennen 3)' },
      { key: 'distancesYouthB', value: 'Youth B (Rennen 3)' },
      { key: 'distancesYouthA', value: 'Youth A (Rennen 1)' },
      { key: 'distancesPromotion', value: 'Promotion (Rennen 1)' },
      { key: 'distancesJuniors', value: 'Juniors (Rennen 1)' },
      { key: 'distancesElite', value: 'Elite / Seniors / Age groupers (Rennen 2)' },
      { key: 'distancesRelayLong', value: 'Staffel  (Rennen 2).' },
      { key: 'distancesNotesTitle', value: 'Hinweise zu den Strecken:' },
      { key: 'distancesNotesTrafficFree', value: 'Alle Strecken sind vollkommen verkehrsfrei.' },
      { key: 'distancesNotesRunning', value: 'Alle Laufstrecken sind überwiegend flach mit Makadam-Oberflächen.' },
      { key: 'distancesNotesCycling', value: 'Die Radstrecken führen durch leicht hügeliges Gelände' },
      { key: 'distancesNotesRefreshments', value: 'Eine Verpflegungsstation ist am Ziel jedes jeweiligen Rennen vorhanden.' },
      { key: 'distancesNotesDetailedMaps', value: 'Detaillierte Streckenkarten sind auf den Seiten den spezifischen Wettbewerben zugänglich' },
      { key: 'logoTagline', value: 'POWERED BY Agence Steve Greisch' },
      { key: 'navInfo', value: 'Info' },
      { key: 'navRoutes', value: 'Strecken' },
      { key: 'navRoutesKids', value: 'Kids A/B' },
      { key: 'navRoutesYouthB', value: 'Youth B/C' },
      { key: 'navRoutesElite', value: 'Elite/AK/Relais' },
      { key: 'navRoutesYouthA', value: 'Youth A/Promo/Juniors' },
      { key: 'navArchive', value: 'Archiv' },
      { key: 'navSponsors', value: 'Sponsoren' },
      { key: 'navVolunteers', value: 'Helfer' },
      { key: 'navContact', value: 'Kontakt' },
      { key: 'footerAboutTitle', value: 'Über das Event' },
      { key: 'footerAboutText', value: 'Die nationalen Duathlon-Meisterschaften sind die wichtigste Veranstaltung in Luxemburg, bei der Laufen und Radfahren kombiniert werden. Kämpfen Sie um den nationalen Titel in einem unvergesslichen Rennen durch Junglinsters wunderschöne Landschaften.' },
      { key: 'footerInfoTitle', value: 'Infos zum Event' },
      { key: 'footerInfoProgram', value: 'Programm' },
      { key: 'footerInfoRegister', value: 'Jetzt anmelden' },
      { key: 'footerInfoCourses', value: 'Strecken' },
      { key: 'footerContactTitle', value: 'Kontakt' },
      { key: 'footerContactText', value: 'Wenn Sie Fragen haben oder weitere Informationen benötigen, können Sie uns gerne kontaktieren:' },
      { key: 'footerFollowTitle', value: 'Folgt uns' },
      { key: 'footerFollowText', value: 'Bleiben Sie über die neuesten Nachrichten und Veranstaltungsinformationen über unsere Social-Media-Kanäle auf dem Laufenden.' },
      { key: 'footerCopyright', value: '© 2025 KARIBU a.s.b.l. Alle Rechte vorbehalten.' },
      { key: 'timeTableRaceKitTime', value: 'ab 8h00' },
      { key: 'timeTableCheckInTime', value: 'ab 8h15' },
      { key: 'checkInInfo', value: 'Check-in eine Stunde vor dem jeweiligen Rennen' },
      { key: 'relayInfoTeamSize', value: 'Ein Team aus 2 oder 3 Mitgliedern' },
      { key: 'relayInfoRelayPoint', value: 'Die jeweiligen Mitglieder wechseln sich nach jedem Übergang ab.' },
      { key: 'showerFacilities', value: 'Duschmöglichkeiten' },
      { key: 'quickNavShower', value: 'Umkleideraum' }
    ],
    lastUpdated: new Date()
  },
  {
    language: 'en',
    page: 'raceInfo',
    sections: [
      { key: 'quickNav', value: 'Quick Navigation' },
      { key: 'quickNavTimeTable', value: 'Schedule' },
      { key: 'quickNavDirections', value: 'Directions' },
      { key: 'quickNavRules', value: 'Rules' },
      { key: 'quickNavScoring', value: 'Scoring' },
      { key: 'quickNavRegistration', value: 'Registration' },
      { key: 'quickNavDistances', value: 'Distances' },
      { key: 'quickNavSponsors', value: 'Sponsors' },
      { key: 'quickNavContact', value: 'Contact' },
      { key: 'raceInfoTitle', value: 'Race Information' },
      { key: 'timeTableTitle', value: 'Schedule' },
      { key: 'timeTableSubtitle', value: 'Schedule & Start Times' },
      { key: 'timeTableHeaderTime', value: 'Time' },
      { key: 'timeTableHeaderProgram', value: 'Program' },
      { key: 'timeTableRaceKit', value: 'Race Kit Distribution' },
      { key: 'timeTableCheckIn', value: 'Check-in & Technical Inspection' },
      { key: 'timeTableRace1', value: 'Start Race 1 (Youth A/ Juniors / Promo)' },
      { key: 'timeTableRace2', value: 'Start Race 2 (Elite / Age-groupers / Relay long)' },
      { key: 'timeTableAwardsRace1', value: 'Awards Ceremony Race 1 (Youth A / Juniors / Promo)' },
      { key: 'timeTableRace3', value: 'Start Race 3 (Youth B/C)' },
      { key: 'timeTableAwardsShortDist', value: 'Awards Ceremony Race 3 (Youth B/C)' },
      { key: 'timeTableRace4', value: 'Start Race 4 (Kids A)' },
      { key: 'timeTableRace5', value: 'Start Race 5 (Kids B)' },
      { key: 'timeTableRace6', value: 'Start Race 6 (Bambinis)' },
      { key: 'timeTableAwardsKids', value: 'Awards Ceremony Race 4 & 5 (Kids A/B)' },
      { key: 'directionsTitle', value: 'DIRECTIONS' },
      { key: 'directionsVenueTitle', value: 'Venue' },
      { key: 'directionsVenueParkRide', value: 'Park+Ride at Rossbuer' },
      { key: 'directionsVenueParkingOptions', value: 'Parking available at P+R' },
      { key: 'rulesTitle', value: 'RULES' },
      { key: 'rulesSubtitle', value: 'Rules applicable to this event include¹:' },
      { key: 'rulesDrafting', value: 'Race type: Drafting Race.' },
      { key: 'rulesHelmet', value: 'Helmet mandatory for all.' },
      { key: 'rulesInspection', value: 'Mandatory technical bike inspection before check-in.' },
      { key: 'rulesMountainBike', value: 'Children have the right to use a mountain bike.' },
      { key: 'rulesLiability', value: 'The organizer is not liable for theft or other criminal acts.' },
      { key: 'rulesFullList', value: 'For complete list please see the' },
      { key: 'rulesRulebook', value: 'rule book of the national Triathlon Federation' },
      { key: 'rulesFootnote', value: '¹but not limited to.' },
      { key: 'scoringTitle', value: 'SCORING' },
      { key: 'scoringSubtitle', value: 'Prizes & Scoring - DUATHLON 2025' },
      { key: 'scoringParticipation', value: 'Each participant receives a participation T-shirt\nAll Bambinis receive a medal' },
      { key: 'scoringElite', value: 'Elite M&F' },
      { key: 'scoringPlace', value: 'Place' },
      { key: 'scoringPrize', value: 'Prize' },
      { key: 'scoringFirstPlace', value: 'Medal + 150 €' },
      { key: 'scoringSecondPlace', value: 'Medal + 130 €' },
      { key: 'scoringThirdPlace', value: 'Medal + 110 €' },
      { key: 'scoringFourthPlace', value: 'Medal + 90 €' },
      { key: 'scoringFifthPlace', value: 'Medal + 80 €' },
      { key: 'scoringOtherCategories', value: 'The top three finishers in each category receive a medal and a gift.' },
      { key: 'registrationTitle', value: 'REGISTRATION' },
      { key: 'registrationSubtitle', value: 'Registration Details' },
      { key: 'registrationDayLicense', value: 'Day license available for non-licensed competitors' },
      { key: 'registrationLateEntry', value: 'Late registration on site with a surcharge of 10 €.' },
      { key: 'registrationDeadline', value: 'Maximum up to 1 hour before race start.' },
      { key: 'registrationButton', value: 'Register Now' },
      { key: 'distancesTitle', value: 'DISTANCES' },
      { key: 'distancesSubtitle', value: 'Race Distances' },
      { key: 'distancesCategoryHeader', value: 'Category' },
      { key: 'distancesFirstRunHeader', value: 'First Run' },
      { key: 'distancesCyclingHeader', value: 'Cycling' },
      { key: 'distancesSecondRunHeader', value: 'Second Run' },
      { key: 'distancesBambini', value: 'Bambinis Race 6' },
      { key: 'distancesKidsAB', value: 'Kids A / B (Races 4 & 5)' },
      { key: 'distancesYouthC', value: 'Youth C (Race 3)' },
      { key: 'distancesYouthB', value: 'Youth B (Race 3)' },
      { key: 'distancesYouthA', value: 'Youth A (Race 1)' },
      { key: 'distancesPromotion', value: 'Promotion (Race 1)' },
      { key: 'distancesJuniors', value: 'Juniors (Race 1)' },
      { key: 'distancesElite', value: 'Elite / Seniors / Age groupers (Race 2)' },
      { key: 'distancesRelayLong', value: 'Relay  (Race 2).' },
      { key: 'distancesNotesTitle', value: 'Course Notes:' },
      { key: 'distancesNotesTrafficFree', value: 'All courses are completely traffic-free.' },
      { key: 'distancesNotesRunning', value: 'All running courses are mostly flat with tarmac surfaces.' },
      { key: 'distancesNotesCycling', value: 'The cycling routes run through slightly hilly terrain' },
      { key: 'distancesNotesRefreshments', value: 'A refreshment station is available at the finish of each race.' },
      { key: 'distancesNotesDetailedMaps', value: 'Detailed course maps are accessible on the specific competition pages' },
      { key: 'contactTitle', value: 'Contact' },
      { key: 'eventContactTitle', value: "Contact de l'Événement" },
      { key: 'emailLabel', value: 'Email:' },
      { key: 'telLabel', value: 'Tél:' },
      { key: 'responsibleEntityLabel', value: 'Entité responsable:' },
      { key: 'websiteContactTitle', value: 'Contact du Site Web' },
      { key: 'logoTagline', value: 'POWERED BY Agence Steve Greisch' },
      { key: 'navInfo', value: 'Info' },
      { key: 'navRoutes', value: 'Courses' },
      { key: 'navRoutesKids', value: 'Kids A/B' },
      { key: 'navRoutesYouthB', value: 'Youth B/C' },
      { key: 'navRoutesElite', value: 'Elite/AK/Relay' },
      { key: 'navRoutesYouthA', value: 'Youth A/Promo/Juniors' },
      { key: 'navArchive', value: 'Archive' },
      { key: 'navSponsors', value: 'Sponsors' },
      { key: 'navVolunteers', value: 'Volunteers' },
      { key: 'navContact', value: 'Contact' },
      { key: 'footerAboutTitle', value: 'About the Event' },
      { key: 'footerAboutText', value: 'The national duathlon championships are the most important event in Luxembourg that combines running and cycling. Compete for the national title in an unforgettable race through the beautiful landscapes of Junglinster.' },
      { key: 'footerInfoTitle', value: 'Event Information' },
      { key: 'footerInfoProgram', value: 'Schedule' },
      { key: 'footerInfoRegister', value: 'Register Now' },
      { key: 'footerInfoCourses', value: 'Courses' },
      { key: 'footerContactTitle', value: 'Contact' },
      { key: 'footerContactText', value: 'If you have questions or need more information, please feel free to contact us:' },
      { key: 'footerFollowTitle', value: 'Follow Us' },
      { key: 'footerFollowText', value: 'Stay updated with the latest news and event information through our social media channels.' },
      { key: 'footerCopyright', value: '© 2025 KARIBU a.s.b.l. All rights reserved.' },
      { key: 'timeTableRaceKitTime', value: 'from 8h00' },
      { key: 'timeTableCheckInTime', value: 'from 8h15' },
      { key: 'checkInInfo', value: 'Check in one hour before the respective race' },
      { key: 'relayInfoTeamSize', value: 'A team of 2 or 3 members' },
      { key: 'relayInfoRelayPoint', value: 'The respective members take turns after each transition.' },
      { key: 'showerFacilities', value: 'Shower Facilities' },
      { key: 'quickNavShower', value: 'Changing Room' }
    ],
    lastUpdated: new Date()
  },
  {
    language: 'fr',
    page: 'raceInfo',
    sections: [
      { key: 'quickNav', value: 'Navigation Rapide' },
      { key: 'quickNavTimeTable', value: 'Programme' },
      { key: 'quickNavDirections', value: 'Accès' },
      { key: 'quickNavRules', value: 'Règles' },
      { key: 'quickNavScoring', value: 'Classement' },
      { key: 'quickNavRegistration', value: 'Inscription' },
      { key: 'quickNavDistances', value: 'Distances' },
      { key: 'quickNavSponsors', value: 'Sponsors' },
      { key: 'quickNavContact', value: 'Contact' },
      { key: 'raceInfoTitle', value: 'Informations de Course' },
      { key: 'timeTableTitle', value: 'Programme' },
      { key: 'timeTableSubtitle', value: 'Programme & Heures de Départ' },
      { key: 'timeTableHeaderTime', value: 'Heure' },
      { key: 'timeTableHeaderProgram', value: 'Programme' },
      { key: 'timeTableRaceKit', value: 'Distribution des dossards' },
      { key: 'timeTableCheckIn', value: 'Check-in & Contrôle Technique' },
      { key: 'timeTableRace1', value: 'Départ Course 1 (Youth A/ Juniors / Promo)' },
      { key: 'timeTableRace2', value: 'Départ Course 2 (Elite / Age-groupers / Relais long)' },
      { key: 'timeTableAwardsRace1', value: 'Remise des prix Course 1 (Youth A / Juniors / Promo)' },
      { key: 'timeTableRace3', value: 'Départ Course 3 (Youth B/C)' },
      { key: 'timeTableAwardsShortDist', value: 'Remise des prix Course 3 (Youth B/C)' },
      { key: 'timeTableRace4', value: 'Départ Course 4 (Kids A)' },
      { key: 'timeTableRace5', value: 'Départ Course 5 (Kids B)' },
      { key: 'timeTableRace6', value: 'Départ Course 6 (Bambinis)' },
      { key: 'timeTableAwardsKids', value: 'Remise des prix Course 4 & 5 (Kids A/B)' },
      { key: 'directionsTitle', value: 'ACCÈS' },
      { key: 'directionsVenueTitle', value: "Lieu de l'événement" },
      { key: 'directionsVenueParkRide', value: 'Park+Ride de Rossbuer' },
      { key: 'directionsVenueParkingOptions', value: 'Possibilités de stationnement au P+R' },
      { key: 'rulesTitle', value: 'RÈGLES' },
      { key: 'rulesSubtitle', value: 'Les règles applicables à cet événement comprennent¹:' },
      { key: 'rulesDrafting', value: 'Type de course: Course avec drafting.' },
      { key: 'rulesHelmet', value: 'Casque obligatoire pour tous.' },
      { key: 'rulesInspection', value: 'Contrôle technique obligatoire du vélo avant le check-in.' },
      { key: 'rulesMountainBike', value: "Les enfants ont le droit d'utiliser un VTT." },
      { key: 'rulesLiability', value: "L'organisateur n'est pas responsable des vols ou autres actes criminels." },
      { key: 'rulesFullList', value: 'Pour la liste complète, veuillez consulter le' },
      { key: 'rulesRulebook', value: 'règlement de la Fédération nationale de Triathlon' },
      { key: 'rulesFootnote', value: '¹mais non limité à.' },
      { key: 'scoringTitle', value: 'CLASSEMENT' },
      { key: 'scoringSubtitle', value: 'Prix & Classement - DUATHLON 2025' },
      { key: 'scoringParticipation', value: 'Chaque participant reçoit un T-shirt de participation\nTous les Bambinis reçoivent une médaille' },
      { key: 'scoringElite', value: 'Elite H&F' },
      { key: 'scoringPlace', value: 'Place' },
      { key: 'scoringPrize', value: 'Prix' },
      { key: 'scoringFirstPlace', value: 'Médaille + 150 €' },
      { key: 'scoringSecondPlace', value: 'Médaille + 130 €' },
      { key: 'scoringThirdPlace', value: 'Médaille + 110 €' },
      { key: 'scoringFourthPlace', value: 'Médaille + 90 €' },
      { key: 'scoringFifthPlace', value: 'Médaille + 80 €' },
      { key: 'scoringOtherCategories', value: 'Les trois premiers de chaque catégorie reçoivent une médaille et un cadeau.' },
      { key: 'registrationTitle', value: 'INSCRIPTION' },
      { key: 'registrationSubtitle', value: "Détails d'inscription" },
      { key: 'registrationDayLicense', value: 'Licence journalière disponible pour les non-licenciés' },
      { key: 'registrationLateEntry', value: 'Inscription tardive sur place avec un supplément de 10 €.' },
      { key: 'registrationDeadline', value: "Maximum jusqu'à 1 heure avant le début de la course." },
      { key: 'registrationButton', value: "S'inscrire maintenant" },
      { key: 'distancesTitle', value: 'DISTANCES' },
      { key: 'distancesSubtitle', value: 'Distances de course' },
      { key: 'distancesCategoryHeader', value: 'Catégorie' },
      { key: 'distancesFirstRunHeader', value: 'Première Course' },
      { key: 'distancesCyclingHeader', value: 'Cyclisme' },
      { key: 'distancesSecondRunHeader', value: 'Deuxième Course' },
      { key: 'distancesBambini', value: 'Bambinis Course 6' },
      { key: 'distancesKidsAB', value: 'Kids A / B (Courses 4 & 5)' },
      { key: 'distancesYouthC', value: 'Youth C (Course 3)' },
      { key: 'distancesYouthB', value: 'Youth B (Course 3)' },
      { key: 'distancesYouthA', value: 'Youth A (Course 1)' },
      { key: 'distancesPromotion', value: 'Promotion (Course 1)' },
      { key: 'distancesJuniors', value: 'Juniors (Course 1)' },
      { key: 'distancesElite', value: 'Elite / Seniors / Age groupers (Course 2)' },
      { key: 'distancesRelayLong', value: 'Relais  (Course 3).' },
      { key: 'distancesNotesTitle', value: 'Notes sur les parcours:' },
      { key: 'distancesNotesTrafficFree', value: 'Tous les parcours sont complètement fermés à la circulation.' },
      { key: 'distancesNotesRunning', value: 'Tous les parcours de course à pied sont majoritairement plats avec des surfaces pavées' },
      { key: 'distancesNotesCycling', value: 'Les parcours cyclistes traversent un terrain légèrement vallonné' },
      { key: 'distancesNotesRefreshments', value: "Un poste de ravitaillement est disponible à l'arrivée de chaque course." },
      { key: 'distancesNotesDetailedMaps', value: 'Des cartes détaillées des parcours sont accessibles sur les pages des compétitions spécifiques' },
      { key: 'logoTagline', value: 'POWERED BY Agence Steve Greisch' },
      { key: 'navInfo', value: 'Infos' },
      { key: 'navRoutes', value: 'Parcours' },
      { key: 'navRoutesKids', value: 'Kids A/B' },
      { key: 'navRoutesYouthB', value: 'Youth B/C' },
      { key: 'navRoutesElite', value: 'Elite/AK/Relais' },
      { key: 'navRoutesYouthA', value: 'Youth A/Promo/Juniors' },
      { key: 'navArchive', value: 'Archives' },
      { key: 'navSponsors', value: 'Sponsors' },
      { key: 'navVolunteers', value: 'Bénévoles' },
      { key: 'navContact', value: 'Contact' },
      { key: 'footerAboutTitle', value: "À propos de l'événement" },
      { key: 'footerAboutText', value: "Les championnats nationaux de duathlon sont l'événement le plus important au Luxembourg qui combine course à pied et cyclisme. Disputez le titre national lors d'une course inoubliable à travers les magnifiques paysages de Junglinster." },
      { key: 'footerInfoTitle', value: "Informations sur l'événement" },
      { key: 'footerInfoProgram', value: 'Programme' },
      { key: 'footerInfoRegister', value: "S'inscrire maintenant" },
      { key: 'footerInfoCourses', value: 'Parcours' },
      { key: 'footerContactTitle', value: 'Contact' },
      { key: 'footerContactText', value: "Si vous avez des questions ou besoin de plus d'informations, n'hésitez pas à nous contacter:" },
      { key: 'footerFollowTitle', value: 'Suivez-nous' },
      { key: 'footerFollowText', value: "Restez informé des dernières nouvelles et informations sur l'événement via nos réseaux sociaux." },
      { key: 'footerCopyright', value: '© 2025 KARIBU a.s.b.l. Tous droits réservés.' },
      { key: 'timeTableRaceKitTime', value: 'à partir de 8h00' },
      { key: 'timeTableCheckInTime', value: 'à partir de 8h15' },
      { key: 'checkInInfo', value: 'Enregistrement une heure avant la course respective' },
      { key: 'relayInfoTeamSize', value: 'Une équipe de 2 ou 3 membres' },
      { key: 'relayInfoRelayPoint', value: 'Les membres respectifs se relaient après chaque transition.' },
      { key: 'showerFacilities', value: 'Installations de Douche' },
      { key: 'quickNavShower', value: 'Vestiaire' }
    ],
    lastUpdated: new Date()
  }
];

// Contact page translations
const contactDataEn = {
  language: 'en',
  page: 'contact',
  sections: [
    { key: 'pageTitle', value: 'Contact' },
    { key: 'eventContactTitle', value: 'Event Contact' },
    { key: 'emailLabel', value: 'Email:' },
    { key: 'emailAddress', value: 'info@lensterduathlon.lu' },
    { key: 'telLabel', value: 'Tel:' },
    { key: 'telNumber', value: '(+352) 621 374 930' },
    { key: 'responsibleEntityLabel', value: 'Responsible Entity:' },
    { key: 'organizationName', value: 'Karibu a.s.b.l.' },
    { key: 'addressLine1', value: '18, rue Neuve' },
    { key: 'addressLine2', value: 'L-6137 Junglinster' },
    { key: 'websiteContactTitle', value: 'Website Contact' },
    { key: 'websiteEmail', value: 'webmaster@lensterduathlon.lu' }
  ],
  lastUpdated: new Date()
};

const contactDataDe = {
  language: 'de',
  page: 'contact',
  sections: [
    { key: 'pageTitle', value: 'Kontakt' },
    { key: 'eventContactTitle', value: 'Event Kontakt' },
    { key: 'emailLabel', value: 'Email:' },
    { key: 'emailAddress', value: 'info@lensterduathlon.lu' },
    { key: 'telLabel', value: 'Tel:' },
    { key: 'telNumber', value: '(+352) 621 374 930' },
    { key: 'responsibleEntityLabel', value: 'Verantwortliche Entität:' },
    { key: 'organizationName', value: 'Karibu a.s.b.l.' },
    { key: 'addressLine1', value: '18, rue Neuve' },
    { key: 'addressLine2', value: 'L-6137 Junglinster' },
    { key: 'websiteContactTitle', value: 'Website Kontakt' },
    { key: 'websiteEmail', value: 'webmaster@lensterduathlon.lu' }
  ],
  lastUpdated: new Date()
};

const contactDataFr = {
  language: 'fr',
  page: 'contact',
  sections: [
    { key: 'pageTitle', value: 'Contact' },
    { key: 'eventContactTitle', value: "Contact de l'Événement" },
    { key: 'emailLabel', value: 'Email:' },
    { key: 'emailAddress', value: 'info@lensterduathlon.lu' },
    { key: 'telLabel', value: 'Tél:' },
    { key: 'telNumber', value: '(+352) 621 374 930' },
    { key: 'responsibleEntityLabel', value: 'Entité responsable:' },
    { key: 'organizationName', value: 'Karibu a.s.b.l.' },
    { key: 'addressLine1', value: '18, rue Neuve' },
    { key: 'addressLine2', value: 'L-6137 Junglinster' },
    { key: 'websiteContactTitle', value: 'Contact du Site Web' },
    { key: 'websiteEmail', value: 'webmaster@lensterduathlon.lu' }
  ],
  lastUpdated: new Date()
};

// Sponsors/Partners page translations
const sponsorsDataEn = {
  language: 'en',
  page: 'sponsors',
  sections: [
    { key: 'pageTitle', value: 'Our Sponsors' },
    { key: 'heroTitle', value: 'Our Partners & Sponsors' },
    { key: 'heroDescription', value: 'The Lënster Duathlon would not be possible without the generous support of our sponsors and partners. We thank them for their commitment to our event and the promotion of duathlon sport in Luxembourg.' },
    { key: 'mainSponsorsTitle', value: 'Main Sponsors' },
    { key: 'goldSponsorsTitle', value: 'Gold Sponsors' },
    { key: 'silverSponsorsTitle', value: 'Silver Sponsors' },
    { key: 'partnersTitle', value: 'Partners' },
    { key: 'becomeSponsorTitle', value: 'Become a Sponsor' },
    { key: 'becomeSponsorText', value: 'Interested in supporting our event? We offer various sponsorship packages tailored to your needs. Contact us to learn more about partnership opportunities.' },
    { key: 'becomeSponsorBtn', value: 'Contact Us' },
    { key: 'thankYouTitle', value: 'Thank You' },
    { key: 'thankYouText', value: 'A heartfelt thank you to all our sponsors and partners for making this event possible. Your support helps us promote sports and community engagement in Luxembourg.' }
  ],
  lastUpdated: new Date()
};

const sponsorsDataDe = {
  language: 'de',
  page: 'sponsors',
  sections: [
    { key: 'pageTitle', value: 'Unsere Sponsoren' },
    { key: 'heroTitle', value: 'Unsere Partner & Sponsoren' },
    { key: 'heroDescription', value: 'Der Lënster Duathlon wäre ohne die großzügige Unterstützung unserer Sponsoren und Partner nicht möglich. Wir danken ihnen für ihr Engagement für unsere Veranstaltung und die Förderung des Duathlon-Sports in Luxemburg.' },
    { key: 'mainSponsorsTitle', value: 'Hauptsponsoren' },
    { key: 'goldSponsorsTitle', value: 'Gold Sponsoren' },
    { key: 'silverSponsorsTitle', value: 'Silber Sponsoren' },
    { key: 'partnersTitle', value: 'Partner' },
    { key: 'becomeSponsorTitle', value: 'Sponsor werden' },
    { key: 'becomeSponsorText', value: 'Interesse, unsere Veranstaltung zu unterstützen? Wir bieten verschiedene Sponsoring-Pakete, die auf Ihre Bedürfnisse zugeschnitten sind. Kontaktieren Sie uns, um mehr über Partnerschaftsmöglichkeiten zu erfahren.' },
    { key: 'becomeSponsorBtn', value: 'Kontaktieren Sie uns' },
    { key: 'thankYouTitle', value: 'Vielen Dank' },
    { key: 'thankYouText', value: 'Ein herzliches Dankeschön an alle unsere Sponsoren und Partner, die diese Veranstaltung möglich machen. Ihre Unterstützung hilft uns, Sport und Gemeinschaftsengagement in Luxemburg zu fördern.' }
  ],
  lastUpdated: new Date()
};

const sponsorsDataFr = {
  language: 'fr',
  page: 'sponsors',
  sections: [
    { key: 'pageTitle', value: 'Nos Sponsors' },
    { key: 'heroTitle', value: 'Nos Partenaires & Sponsors' },
    { key: 'heroDescription', value: "Le Lënster Duathlon ne serait pas possible sans le soutien généreux de nos sponsors et partenaires. Nous les remercions pour leur engagement envers notre événement et la promotion du duathlon au Luxembourg." },
    { key: 'mainSponsorsTitle', value: 'Sponsors Principaux' },
    { key: 'goldSponsorsTitle', value: 'Sponsors Or' },
    { key: 'silverSponsorsTitle', value: 'Sponsors Argent' },
    { key: 'partnersTitle', value: 'Partenaires' },
    { key: 'becomeSponsorTitle', value: 'Devenir Sponsor' },
    { key: 'becomeSponsorText', value: "Intéressé à soutenir notre événement? Nous proposons différents forfaits de sponsoring adaptés à vos besoins. Contactez-nous pour en savoir plus sur les opportunités de partenariat." },
    { key: 'becomeSponsorBtn', value: 'Contactez-nous' },
    { key: 'thankYouTitle', value: 'Merci' },
    { key: 'thankYouText', value: "Un grand merci à tous nos sponsors et partenaires qui rendent cet événement possible. Votre soutien nous aide à promouvoir le sport et l'engagement communautaire au Luxembourg." }
  ],
  lastUpdated: new Date()
};

// Login page translations
const loginDataEn = {
  language: 'en',
  page: 'login',
  sections: [
    { key: 'pageTitle', value: 'Login' },
    { key: 'formTitle', value: 'Sign In' },
    { key: 'emailLabel', value: 'Email' },
    { key: 'emailPlaceholder', value: 'Enter your email' },
    { key: 'passwordLabel', value: 'Password' },
    { key: 'passwordPlaceholder', value: 'Enter your password' },
    { key: 'submitButton', value: 'Sign In' },
    { key: 'forgotPassword', value: 'Forgot Password?' },
    { key: 'noAccount', value: "Don't have an account?" },
    { key: 'registerLink', value: 'Register' },
    { key: 'logoTagline', value: 'POWERED BY Agence Steve Greisch' },
    { key: 'navInfo', value: 'Info' },
    { key: 'navRoutes', value: 'Courses' },
    { key: 'navRoutesKids', value: 'Kids A/B' },
    { key: 'navRoutesYouthB', value: 'Youth B/C' },
    { key: 'navRoutesElite', value: 'Elite/AK/Relay' },
    { key: 'navRoutesYouthA', value: 'Youth A/Promo/Juniors' },
    { key: 'navArchive', value: 'Archive' },
    { key: 'navSponsors', value: 'Sponsors' },
    { key: 'navVolunteers', value: 'Volunteers' },
    { key: 'navContact', value: 'Contact' }
  ],
  lastUpdated: new Date()
};

const loginDataDe = {
  language: 'de',
  page: 'login',
  sections: [
    { key: 'pageTitle', value: 'Anmelden' },
    { key: 'formTitle', value: 'Anmelden' },
    { key: 'emailLabel', value: 'E-Mail' },
    { key: 'emailPlaceholder', value: 'E-Mail eingeben' },
    { key: 'passwordLabel', value: 'Passwort' },
    { key: 'passwordPlaceholder', value: 'Passwort eingeben' },
    { key: 'submitButton', value: 'Anmelden' },
    { key: 'forgotPassword', value: 'Passwort vergessen?' },
    { key: 'noAccount', value: 'Noch kein Konto?' },
    { key: 'registerLink', value: 'Registrieren' },
    { key: 'logoTagline', value: 'POWERED BY Agence Steve Greisch' },
    { key: 'navInfo', value: 'Info' },
    { key: 'navRoutes', value: 'Strecken' },
    { key: 'navRoutesKids', value: 'Kids A/B' },
    { key: 'navRoutesYouthB', value: 'Youth B/C' },
    { key: 'navRoutesElite', value: 'Elite/AK/Relais' },
    { key: 'navRoutesYouthA', value: 'Youth A/Promo/Juniors' },
    { key: 'navArchive', value: 'Archiv' },
    { key: 'navSponsors', value: 'Sponsoren' },
    { key: 'navVolunteers', value: 'Helfer' },
    { key: 'navContact', value: 'Kontakt' }
  ],
  lastUpdated: new Date()
};

const loginDataFr = {
  language: 'fr',
  page: 'login',
  sections: [
    { key: 'pageTitle', value: 'Connexion' },
    { key: 'formTitle', value: 'Se connecter' },
    { key: 'emailLabel', value: 'Email' },
    { key: 'emailPlaceholder', value: 'Entrez votre email' },
    { key: 'passwordLabel', value: 'Mot de passe' },
    { key: 'passwordPlaceholder', value: 'Entrez votre mot de passe' },
    { key: 'submitButton', value: 'Se connecter' },
    { key: 'forgotPassword', value: 'Mot de passe oublié?' },
    { key: 'noAccount', value: "Pas encore de compte?" },
    { key: 'registerLink', value: "S'inscrire" },
    { key: 'logoTagline', value: 'POWERED BY Agence Steve Greisch' },
    { key: 'navInfo', value: 'Infos' },
    { key: 'navRoutes', value: 'Parcours' },
    { key: 'navRoutesKids', value: 'Kids A/B' },
    { key: 'navRoutesYouthB', value: 'Youth B/C' },
    { key: 'navRoutesElite', value: 'Elite/AK/Relais' },
    { key: 'navRoutesYouthA', value: 'Youth A/Promo/Juniors' },
    { key: 'navArchive', value: 'Archives' },
    { key: 'navSponsors', value: 'Sponsors' },
    { key: 'navVolunteers', value: 'Bénévoles' },
    { key: 'navContact', value: 'Contact' }
  ],
  lastUpdated: new Date()
};

// Volunteers/TBA page translations
const volunteersDataEn = {
  language: 'en',
  page: 'volunteers',
  sections: [
    { key: 'pageTitle', value: 'Volunteers' },
    { key: 'tbaTitle', value: 'TBA - To be announced' },
    { key: 'tbaDescription', value: 'For more information contact' },
    { key: 'heroTitle', value: 'Become a Volunteer' },
    { key: 'heroDescription', value: 'Join our team of dedicated volunteers and help make the Lënster Duathlon a success!' },
    { key: 'whyVolunteerTitle', value: 'Why Volunteer?' },
    { key: 'whyVolunteerText', value: 'Volunteering at the Lënster Duathlon is a great way to be part of an exciting sporting event, meet new people, and support your local community.' },
    { key: 'rolesTitle', value: 'Volunteer Roles' },
    { key: 'roleRefreshment', value: 'Refreshment Stations' },
    { key: 'roleCourseMarshall', value: 'Course Marshalls' },
    { key: 'roleRegistration', value: 'Registration Desk' },
    { key: 'roleFinishLine', value: 'Finish Line Support' },
    { key: 'signUpTitle', value: 'Sign Up' },
    { key: 'signUpText', value: 'Interested in volunteering? Contact us to register your interest.' },
    { key: 'signUpButton', value: 'Contact Us' },
    { key: 'logoTagline', value: 'POWERED BY Agence Steve Greisch' },
    { key: 'navInfo', value: 'Info' },
    { key: 'navRoutes', value: 'Courses' },
    { key: 'navRoutesKids', value: 'Kids A/B' },
    { key: 'navRoutesYouthB', value: 'Youth B/C' },
    { key: 'navRoutesElite', value: 'Elite/AK/Relay' },
    { key: 'navRoutesYouthA', value: 'Youth A/Promo/Juniors' },
    { key: 'navArchive', value: 'Archive' },
    { key: 'navSponsors', value: 'Sponsors' },
    { key: 'navVolunteers', value: 'Volunteers' },
    { key: 'navContact', value: 'Contact' }
  ],
  lastUpdated: new Date()
};

const volunteersDataDe = {
  language: 'de',
  page: 'volunteers',
  sections: [
    { key: 'pageTitle', value: 'Helfer' },
    { key: 'tbaTitle', value: 'TBA - Wird noch bekannt gegeben' },
    { key: 'tbaDescription', value: 'Für weitere Informationen kontaktieren Sie' },
    { key: 'heroTitle', value: 'Helfer werden' },
    { key: 'heroDescription', value: 'Werden Sie Teil unseres engagierten Helferteams und helfen Sie mit, den Lënster Duathlon zum Erfolg zu führen!' },
    { key: 'whyVolunteerTitle', value: 'Warum Helfer werden?' },
    { key: 'whyVolunteerText', value: 'Als Helfer beim Lënster Duathlon sind Sie Teil eines aufregenden Sportereignisses, lernen neue Leute kennen und unterstützen Ihre lokale Gemeinschaft.' },
    { key: 'rolesTitle', value: 'Helfer-Rollen' },
    { key: 'roleRefreshment', value: 'Verpflegungsstationen' },
    { key: 'roleCourseMarshall', value: 'Streckenposten' },
    { key: 'roleRegistration', value: 'Anmeldung' },
    { key: 'roleFinishLine', value: 'Zielbereich' },
    { key: 'signUpTitle', value: 'Anmelden' },
    { key: 'signUpText', value: 'Interesse am Helfen? Kontaktieren Sie uns, um sich anzumelden.' },
    { key: 'signUpButton', value: 'Kontaktieren Sie uns' },
    { key: 'logoTagline', value: 'POWERED BY Agence Steve Greisch' },
    { key: 'navInfo', value: 'Info' },
    { key: 'navRoutes', value: 'Strecken' },
    { key: 'navRoutesKids', value: 'Kids A/B' },
    { key: 'navRoutesYouthB', value: 'Youth B/C' },
    { key: 'navRoutesElite', value: 'Elite/AK/Relais' },
    { key: 'navRoutesYouthA', value: 'Youth A/Promo/Juniors' },
    { key: 'navArchive', value: 'Archiv' },
    { key: 'navSponsors', value: 'Sponsoren' },
    { key: 'navVolunteers', value: 'Helfer' },
    { key: 'navContact', value: 'Kontakt' }
  ],
  lastUpdated: new Date()
};

const volunteersDataFr = {
  language: 'fr',
  page: 'volunteers',
  sections: [
    { key: 'pageTitle', value: 'Bénévoles' },
    { key: 'tbaTitle', value: 'TBA - À annoncer' },
    { key: 'tbaDescription', value: 'Pour plus d\'informations, contactez' },
    { key: 'heroTitle', value: 'Devenir Bénévole' },
    { key: 'heroDescription', value: 'Rejoignez notre équipe de bénévoles dévoués et aidez à faire du Lënster Duathlon un succès!' },
    { key: 'whyVolunteerTitle', value: 'Pourquoi devenir bénévole?' },
    { key: 'whyVolunteerText', value: 'Être bénévole au Lënster Duathlon est une excellente façon de participer à un événement sportif passionnant, de rencontrer de nouvelles personnes et de soutenir votre communauté locale.' },
    { key: 'rolesTitle', value: 'Rôles des Bénévoles' },
    { key: 'roleRefreshment', value: 'Postes de Ravitaillement' },
    { key: 'roleCourseMarshall', value: 'Commissaires de Parcours' },
    { key: 'roleRegistration', value: 'Accueil et Inscription' },
    { key: 'roleFinishLine', value: 'Zone d\'Arrivée' },
    { key: 'signUpTitle', value: 'S\'inscrire' },
    { key: 'signUpText', value: 'Intéressé à devenir bénévole? Contactez-nous pour vous inscrire.' },
    { key: 'signUpButton', value: 'Contactez-nous' },
    { key: 'logoTagline', value: 'POWERED BY Agence Steve Greisch' },
    { key: 'navInfo', value: 'Infos' },
    { key: 'navRoutes', value: 'Parcours' },
    { key: 'navRoutesKids', value: 'Kids A/B' },
    { key: 'navRoutesYouthB', value: 'Youth B/C' },
    { key: 'navRoutesElite', value: 'Elite/AK/Relais' },
    { key: 'navRoutesYouthA', value: 'Youth A/Promo/Juniors' },
    { key: 'navArchive', value: 'Archives' },
    { key: 'navSponsors', value: 'Sponsors' },
    { key: 'navVolunteers', value: 'Bénévoles' },
    { key: 'navContact', value: 'Contact' }
  ],
  lastUpdated: new Date()
};

// Archive page translations
const archiveDataEn = {
  language: 'en',
  page: 'archive',
  sections: [
    { key: 'pageTitle', value: 'Archive' },
    { key: 'heroTitle', value: 'Event Archive' },
    { key: 'heroDescription', value: 'Browse through the history of Lënster Duathlon events.' },
    { key: 'resultsTitle', value: 'Past Results' },
    { key: 'resultsDescription', value: 'View results from previous editions of the Lënster Duathlon.' },
    { key: 'viewResultsButton', value: 'View Results' },
    { key: 'photosTitle', value: 'Photo Gallery' },
    { key: 'photosDescription', value: 'Relive the best moments from past events.' },
    { key: 'viewPhotosButton', value: 'View Photos' },
    { key: 'noEventsMessage', value: 'No archived events available yet.' },
    { key: 'logoTagline', value: 'POWERED BY Agence Steve Greisch' },
    { key: 'navInfo', value: 'Info' },
    { key: 'navRoutes', value: 'Courses' },
    { key: 'navRoutesKids', value: 'Kids A/B' },
    { key: 'navRoutesYouthB', value: 'Youth B/C' },
    { key: 'navRoutesElite', value: 'Elite/AK/Relay' },
    { key: 'navRoutesYouthA', value: 'Youth A/Promo/Juniors' },
    { key: 'navArchive', value: 'Archive' },
    { key: 'navSponsors', value: 'Sponsors' },
    { key: 'navVolunteers', value: 'Volunteers' },
    { key: 'navContact', value: 'Contact' }
  ],
  lastUpdated: new Date()
};

const archiveDataDe = {
  language: 'de',
  page: 'archive',
  sections: [
    { key: 'pageTitle', value: 'Archiv' },
    { key: 'heroTitle', value: 'Event-Archiv' },
    { key: 'heroDescription', value: 'Stöbern Sie durch die Geschichte der Lënster Duathlon-Veranstaltungen.' },
    { key: 'resultsTitle', value: 'Vergangene Ergebnisse' },
    { key: 'resultsDescription', value: 'Sehen Sie sich die Ergebnisse früherer Ausgaben des Lënster Duathlon an.' },
    { key: 'viewResultsButton', value: 'Ergebnisse ansehen' },
    { key: 'photosTitle', value: 'Fotogalerie' },
    { key: 'photosDescription', value: 'Erleben Sie die besten Momente vergangener Veranstaltungen noch einmal.' },
    { key: 'viewPhotosButton', value: 'Fotos ansehen' },
    { key: 'noEventsMessage', value: 'Noch keine archivierten Veranstaltungen verfügbar.' },
    { key: 'logoTagline', value: 'POWERED BY Agence Steve Greisch' },
    { key: 'navInfo', value: 'Info' },
    { key: 'navRoutes', value: 'Strecken' },
    { key: 'navRoutesKids', value: 'Kids A/B' },
    { key: 'navRoutesYouthB', value: 'Youth B/C' },
    { key: 'navRoutesElite', value: 'Elite/AK/Relais' },
    { key: 'navRoutesYouthA', value: 'Youth A/Promo/Juniors' },
    { key: 'navArchive', value: 'Archiv' },
    { key: 'navSponsors', value: 'Sponsoren' },
    { key: 'navVolunteers', value: 'Helfer' },
    { key: 'navContact', value: 'Kontakt' }
  ],
  lastUpdated: new Date()
};

const archiveDataFr = {
  language: 'fr',
  page: 'archive',
  sections: [
    { key: 'pageTitle', value: 'Archives' },
    { key: 'heroTitle', value: 'Archives des Événements' },
    { key: 'heroDescription', value: 'Parcourez l\'histoire des événements du Lënster Duathlon.' },
    { key: 'resultsTitle', value: 'Résultats Passés' },
    { key: 'resultsDescription', value: 'Consultez les résultats des éditions précédentes du Lënster Duathlon.' },
    { key: 'viewResultsButton', value: 'Voir les Résultats' },
    { key: 'photosTitle', value: 'Galerie Photos' },
    { key: 'photosDescription', value: 'Revivez les meilleurs moments des événements passés.' },
    { key: 'viewPhotosButton', value: 'Voir les Photos' },
    { key: 'noEventsMessage', value: 'Aucun événement archivé disponible pour le moment.' },
    { key: 'logoTagline', value: 'POWERED BY Agence Steve Greisch' },
    { key: 'navInfo', value: 'Infos' },
    { key: 'navRoutes', value: 'Parcours' },
    { key: 'navRoutesKids', value: 'Kids A/B' },
    { key: 'navRoutesYouthB', value: 'Youth B/C' },
    { key: 'navRoutesElite', value: 'Elite/AK/Relais' },
    { key: 'navRoutesYouthA', value: 'Youth A/Promo/Juniors' },
    { key: 'navArchive', value: 'Archives' },
    { key: 'navSponsors', value: 'Sponsors' },
    { key: 'navVolunteers', value: 'Bénévoles' },
    { key: 'navContact', value: 'Contact' }
  ],
  lastUpdated: new Date()
};

// Privacy Policy page translations
const privacyPolicyDataEn = {
  language: 'en',
  page: 'privacyPolicy',
  sections: [
    { key: 'pageTitle', value: 'Privacy Policy' },
    { key: 'heroTitle', value: 'Privacy Policy' },
    { key: 'lastUpdated', value: 'Last Updated' },
    { key: 'introTitle', value: 'Introduction' },
    { key: 'introText', value: 'We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information.' },
    { key: 'dataCollectionTitle', value: 'Data Collection' },
    { key: 'dataCollectionText', value: 'We collect information you provide directly, such as registration details, contact information, and race preferences.' },
    { key: 'dataUseTitle', value: 'How We Use Your Data' },
    { key: 'dataUseText', value: 'Your data is used for event registration, communication about the event, and improving our services.' },
    { key: 'dataProtectionTitle', value: 'Data Protection' },
    { key: 'dataProtectionText', value: 'We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.' },
    { key: 'contactTitle', value: 'Contact Us' },
    { key: 'contactText', value: 'If you have questions about this privacy policy, please contact us.' },
    { key: 'logoTagline', value: 'POWERED BY Agence Steve Greisch' },
    { key: 'navInfo', value: 'Info' },
    { key: 'navRoutes', value: 'Courses' },
    { key: 'navRoutesKids', value: 'Kids A/B' },
    { key: 'navRoutesYouthB', value: 'Youth B/C' },
    { key: 'navRoutesElite', value: 'Elite/AK/Relay' },
    { key: 'navRoutesYouthA', value: 'Youth A/Promo/Juniors' },
    { key: 'navArchive', value: 'Archive' },
    { key: 'navSponsors', value: 'Sponsors' },
    { key: 'navVolunteers', value: 'Volunteers' },
    { key: 'navContact', value: 'Contact' }
  ],
  lastUpdated: new Date()
};

const privacyPolicyDataDe = {
  language: 'de',
  page: 'privacyPolicy',
  sections: [
    { key: 'pageTitle', value: 'Datenschutzrichtlinie' },
    { key: 'heroTitle', value: 'Datenschutzrichtlinie' },
    { key: 'lastUpdated', value: 'Zuletzt aktualisiert' },
    { key: 'introTitle', value: 'Einleitung' },
    { key: 'introText', value: 'Wir respektieren Ihre Privatsphäre und verpflichten uns, Ihre persönlichen Daten zu schützen. Diese Datenschutzrichtlinie erklärt, wie wir Ihre Informationen sammeln, verwenden und schützen.' },
    { key: 'dataCollectionTitle', value: 'Datenerhebung' },
    { key: 'dataCollectionText', value: 'Wir erheben Informationen, die Sie direkt angeben, wie Anmeldedaten, Kontaktinformationen und Rennpräferenzen.' },
    { key: 'dataUseTitle', value: 'Wie wir Ihre Daten verwenden' },
    { key: 'dataUseText', value: 'Ihre Daten werden für die Veranstaltungsanmeldung, Kommunikation über das Event und die Verbesserung unserer Dienste verwendet.' },
    { key: 'dataProtectionTitle', value: 'Datenschutz' },
    { key: 'dataProtectionText', value: 'Wir implementieren angemessene Sicherheitsmaßnahmen, um Ihre persönlichen Informationen vor unbefugtem Zugriff oder Offenlegung zu schützen.' },
    { key: 'contactTitle', value: 'Kontaktieren Sie uns' },
    { key: 'contactText', value: 'Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, kontaktieren Sie uns bitte.' },
    { key: 'logoTagline', value: 'POWERED BY Agence Steve Greisch' },
    { key: 'navInfo', value: 'Info' },
    { key: 'navRoutes', value: 'Strecken' },
    { key: 'navRoutesKids', value: 'Kids A/B' },
    { key: 'navRoutesYouthB', value: 'Youth B/C' },
    { key: 'navRoutesElite', value: 'Elite/AK/Relais' },
    { key: 'navRoutesYouthA', value: 'Youth A/Promo/Juniors' },
    { key: 'navArchive', value: 'Archiv' },
    { key: 'navSponsors', value: 'Sponsoren' },
    { key: 'navVolunteers', value: 'Helfer' },
    { key: 'navContact', value: 'Kontakt' }
  ],
  lastUpdated: new Date()
};

const privacyPolicyDataFr = {
  language: 'fr',
  page: 'privacyPolicy',
  sections: [
    { key: 'pageTitle', value: 'Politique de Confidentialité' },
    { key: 'heroTitle', value: 'Politique de Confidentialité' },
    { key: 'lastUpdated', value: 'Dernière mise à jour' },
    { key: 'introTitle', value: 'Introduction' },
    { key: 'introText', value: 'Nous respectons votre vie privée et nous engageons à protéger vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.' },
    { key: 'dataCollectionTitle', value: 'Collecte de Données' },
    { key: 'dataCollectionText', value: 'Nous collectons les informations que vous fournissez directement, telles que les détails d\'inscription, les coordonnées et les préférences de course.' },
    { key: 'dataUseTitle', value: 'Comment Nous Utilisons Vos Données' },
    { key: 'dataUseText', value: 'Vos données sont utilisées pour l\'inscription à l\'événement, la communication sur l\'événement et l\'amélioration de nos services.' },
    { key: 'dataProtectionTitle', value: 'Protection des Données' },
    { key: 'dataProtectionText', value: 'Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès non autorisé ou divulgation.' },
    { key: 'contactTitle', value: 'Contactez-nous' },
    { key: 'contactText', value: 'Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter.' },
    { key: 'logoTagline', value: 'POWERED BY Agence Steve Greisch' },
    { key: 'navInfo', value: 'Infos' },
    { key: 'navRoutes', value: 'Parcours' },
    { key: 'navRoutesKids', value: 'Kids A/B' },
    { key: 'navRoutesYouthB', value: 'Youth B/C' },
    { key: 'navRoutesElite', value: 'Elite/AK/Relais' },
    { key: 'navRoutesYouthA', value: 'Youth A/Promo/Juniors' },
    { key: 'navArchive', value: 'Archives' },
    { key: 'navSponsors', value: 'Sponsors' },
    { key: 'navVolunteers', value: 'Bénévoles' },
    { key: 'navContact', value: 'Contact' }
  ],
  lastUpdated: new Date()
};

const seedDB = async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}?authSource=admin`);
    console.log('MongoDB connected');

    // Clear existing raceInfo content
    await Content.deleteMany({ page: 'raceInfo' });
    console.log('Cleared existing raceInfo content');

    // Clear existing home content
    await Content.deleteMany({ page: 'home' });
    console.log('Cleared existing home content');

    // Clear existing distance page content
    await Content.deleteMany({ page: 'kidsDistance' });
    await Content.deleteMany({ page: 'shortDistance' });
    await Content.deleteMany({ page: 'middleDistance' });
    await Content.deleteMany({ page: 'longDistance' });
    console.log('Cleared existing distance page content');

    // Clear existing contact content
    await Content.deleteMany({ page: 'contact' });
    console.log('Cleared existing contact content');

    // Clear existing sponsors content
    await Content.deleteMany({ page: 'sponsors' });
    console.log('Cleared existing sponsors content');

    // Clear existing login content
    await Content.deleteMany({ page: 'login' });
    console.log('Cleared existing login content');

    // Clear existing volunteers content
    await Content.deleteMany({ page: 'volunteers' });
    console.log('Cleared existing volunteers content');

    // Clear existing archive content
    await Content.deleteMany({ page: 'archive' });
    console.log('Cleared existing archive content');

    // Clear existing privacy policy content
    await Content.deleteMany({ page: 'privacyPolicy' });
    console.log('Cleared existing privacyPolicy content');

    // Insert raceInfo seed data
    await Content.insertMany(seedData);
    console.log('RaceInfo content seed data inserted successfully');

    // Insert home page seed data
    await Content.insertMany([homeDataEn, homeDataDe, homeDataFr]);
    console.log('Home content seed data inserted successfully');

    // Insert kids distance page seed data
    await Content.insertMany([kidsDistanceDataEn, kidsDistanceDataDe, kidsDistanceDataFr]);
    console.log('Kids distance content seed data inserted successfully');

    // Insert short distance page seed data
    await Content.insertMany([shortDistanceDataEn, shortDistanceDataDe, shortDistanceDataFr]);
    console.log('Short distance content seed data inserted successfully');

    // Insert middle distance page seed data
    await Content.insertMany([middleDistanceDataEn, middleDistanceDataDe, middleDistanceDataFr]);
    console.log('Middle distance content seed data inserted successfully');

    // Insert long distance page seed data
    await Content.insertMany([longDistanceDataEn, longDistanceDataDe, longDistanceDataFr]);
    console.log('Long distance content seed data inserted successfully');

    // Insert contact page seed data
    await Content.insertMany([contactDataEn, contactDataDe, contactDataFr]);
    console.log('Contact content seed data inserted successfully');

    // Insert sponsors page seed data
    await Content.insertMany([sponsorsDataEn, sponsorsDataDe, sponsorsDataFr]);
    console.log('Sponsors content seed data inserted successfully');

    // Insert login page seed data
    await Content.insertMany([loginDataEn, loginDataDe, loginDataFr]);
    console.log('Login content seed data inserted successfully');

    // Insert volunteers page seed data
    await Content.insertMany([volunteersDataEn, volunteersDataDe, volunteersDataFr]);
    console.log('Volunteers content seed data inserted successfully');

    // Insert archive page seed data
    await Content.insertMany([archiveDataEn, archiveDataDe, archiveDataFr]);
    console.log('Archive content seed data inserted successfully');

    // Insert privacy policy page seed data
    await Content.insertMany([privacyPolicyDataEn, privacyPolicyDataDe, privacyPolicyDataFr]);
    console.log('Privacy policy content seed data inserted successfully');

    // Clear existing 2025 event and insert new one
    await Event.deleteMany({ eventEdition: '2025' });
    await Event.create(eventData);
    console.log('Event seed data inserted successfully');

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDB();
