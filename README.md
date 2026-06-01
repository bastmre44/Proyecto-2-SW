# Not-Balatro

El objetivo principal del proyecto es practicar y reforzar los conocimientos de React en: manejo de
componentes, estado, eventos, renderizado condicional, listas dinámicas y separación lógica en archivos
reutilizables.
Este proyecto no busca replicar Balatro completo, sino crear una versión simplificada y funcional con
reglas propias

## Video Demostrativo 

https://canva.link/6ypqtneajxti36l

## Tecnologías

- React
- Vite
- JavaScript
- CSS

## Instalación

```bash
npm install
npm run dev
```

## Estructura del proyecto

```
src/
├── components/
│   ├── ActionButtons/
│   ├── Card/
│   ├── GameOver/
│   ├── Hand/
│   ├── JokerPanel/
│   ├── LivesDisplay/
│   ├── Menu/
│   ├── ScoreBoard/
│   └── TarotModal/
├── data/
│   ├── cards/        
│   └── tarot/        
├── hooks/
│   ├── game/         
│   └── ui/           
├── utils/
│   ├── deck/        
│   └── score/        
└── styles/
    └── global.css
```

## Reglas

- Se reparten 8 cartas por ronda
- El jugador selecciona cartas para formar combinaciones de poker
- Si no se alcanza el puntaje objetivo se pierde una vida (3 vidas totales)
- Hay un limite de 3 descartes por ronda
- Al avanzar de ronda se elige un joker nuevo
- Con 0 vidas es game over

## Combinaciones

| Combinacion   | Puntaje base | Multiplicador |
|---------------|-------------|---------------|
| Escalera Real | 100         | x8            |
| Poker         | 60          | x7            |
| Full House    | 40          | x4            |
| Flush         | 35          | x4            |
| Escalera      | 30          | x4            |
| Trio          | 30          | x3            |
| Doble Par     | 20          | x2            |
| Par           | 10          | x2            |
| Carta Alta    | 5           | x1            |

## Dificultades

| Dificultad | Puntaje inicial | Incremento por ronda |
|------------|----------------|----------------------|
| Facil      | 100            |  50                  |
| Normal     | 200            |  100                 |
| Dificil    | 350            |  175                 |

## Jokers
 
 
| Joker              | Efecto                                         |
|--------------------|------------------------------------------------|
| Multiplicador Loco | Multiplica el puntaje total x2                 |
| Bonus Fijo         | Suma 50 puntos al puntaje total                |
| Rey de Corazones   | x1.5 si hay al menos un corazon en la mano     |
| La Corte           | +15 puntos por cada figura (J, Q, K)           |
| As Supremo         | x3 si hay un As en la mano                     |
| Coleccionista      | +30 puntos por cada par en la mano             |
 
## Cartas de Tarot
 
El jugador puede aplicar su efecto o ignorarla
 
| Carta                  | Efecto                                                |
|------------------------|-------------------------------------------------------|
| El Loco                | Reemplaza toda la mano por cartas nuevas              |
| El Mago                | Duplica el valor numerico de las cartas seleccionadas |
| La Rueda de la Fortuna | Reduce el puntaje objetivo en 100 puntos              |
| La Estrella            | Convierte las cartas seleccionadas a diamantes        |
| La Fuerza              | Sube en 1 el valor numerico de todas las cartas       |
| El Ermitano            | Recupera una vida perdida                             |
 
## Cartas Especiales
 
Los Ases son cartas especiales mmarcada con una estrella con el borde color dorado
 
## Acciones disponibles
 
- **Play Hand**: juega las cartas seleccionadas y calcula el puntaje
- **Discard**: descarta las cartas seleccionadas y recibe nuevas (limite de 3 por ronda)
- **Skip**: avanza a la siguiente ronda sin jugar
- **Restart**: reinicia la partida desde el menu
