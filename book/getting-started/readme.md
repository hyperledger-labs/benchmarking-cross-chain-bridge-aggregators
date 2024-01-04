# Compatibility + Troubleshooting

### Troubleshooting

This project was successfully tested on the following with node version v18.17.1 and python 3.9.18

| System         | Node     | Python |
| -------------- | -------- | ------ |
| 6.4.12-arch1-1 | v18.17.1 | 3.9.18 |
| MacOS M1 v13.4 | v18.17.1 | 3.9.18 |

| Runtime / Package Manager | NPM | Yarn | Bun |
| ------------------------- | --- | ---- | --- |
| NPM                       | ☑   | ☑    | ☑   |
| Yarn                      | ☑   | ☑    | ☑   |
| Bun                       | ☒\* | ☒\*  | ☒\* |
| \*-error with uniswap sdk |     |      |     |

1. JSBI when runtime and package manager
2. Buffer/Stream when packages installed with npm or yarn and run with bun

Make sure you have permission to run the `.sh` scripts. You might need to run`chmod -R 777 .`&#x20;



Known issues and fixes:

1. Something about fetch missing\
   Solution: Use node v18.17.1 (there were some changes with the default packages included in node, version gte the one we used seems to work)
2. JSBI or Buffer/Stream\
   Solution: use npm or yarn
