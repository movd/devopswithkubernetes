# hashgenerator aka the main application for the DevOps with Kubernetes MOOC

This folder contains the app created in exercises 1.01, 1.03, 1.07, 1.10, 1.11

Two services (created with Node.js)

- `devopswithkubernetes-hashgenerator`: Prints a UUID every 5 seconds in an infinite loop and saves it to a file
- `devopswithkubernetes-hashgenerator-server`: serves the file via http.

## Container Images

The image is available at Docker hub [movd/devopswithkubernetes-hashgenerator](https://hub.docker.com/r/movd/devopswithkubernetes-hashgenerator).

[![](https://images.microbadger.com/badges/image/movd/devopswithkubernetes-hashgenerator.svg)](https://microbadger.com/images/movd/devopswithkubernetes-hashgenerator "Get your own image badge on microbadger.com")
