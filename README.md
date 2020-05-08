# WMD1920-PWA-BREAK

Door Raf Vanpuyvelde & Dmitriy Van der Elst

Link naar online applicatie: https://wmd-1920-pwa-break.web.app/

Figma link: https://www.figma.com/file/NVXP8sWTe3zxCV16ncIiMi/PWA-Odisee?node-id=0%3A1

Technische en functionele vereisten:
    - Communicatie client (Nuxt PWA) <-> server (Express & Mongoose API)
    - Push Bericht -> Bij aanmaken groep

Technische vereisten:
    - PWA & PWA vereisten
        - Lighthouse:
            - 08/05/2020 
                - 90 | 66 | 93 | 100
                - 3/3 | 3/3 | 7/7
    - Installeerbaar
    - Responsive & Progressive
    - Geen page reloads (SPA)
    - PWA Feature:
        - Eerder bezochte groepen offline zichtbaar
    - Notificaties via service worker

COMMANDO'S:
yarn build:firebase
yarn start:firebase
And to deploy:
yarn build:firebase
yarn deploy
Tho, for development, you can still use
yarn dev