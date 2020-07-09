# My Answers for Exercise 1.01: Getting started

Prints a UUID every 5 seconds in an infinite loop. Created with Node.js.

## Container Image

The image is available at Docker hub [movd/devopswithkubernetes-hashgenerator](https://hub.docker.com/r/movd/devopswithkubernetes-hashgenerator).

[![](https://images.microbadger.com/badges/image/movd/devopswithkubernetes-hashgenerator.svg)](https://microbadger.com/images/movd/devopswithkubernetes-hashgenerator "Get your own image badge on microbadger.com")

## Run it with kubernetes

### CLI approach (Exercise 1.02)

```sh
$ kubectl create deployment hashgenerator-movd --image=movd/devopswithkubernetes-hashgenerator
deployment.apps/hashgenerator-movd create
$ kubectl logs -f hashgenerator-movd-67774b9cf4-dfp52

> 01-hash-generator@1.0.0 start /app
> node index.js

2020-07-08T17:03:15.456Z: 53dafd1f-694b-4d42-bd7e-235cd250a482
2020-07-08T17:03:20.463Z: 52f4a26d-a0ed-4649-b19f-ae1e3f65dd9b
2020-07-08T17:03:25.468Z: 5ce2f729-2e2b-48aa-9ccb-3927a13811c7
2020-07-08T17:03:30.468Z: e1702f00-dcdb-401b-825a-9a23731e6d86
$ kubectl delete deployments.apps hashgenerator-movd
deployment.apps "hashgenerator-movd" deleted
```

### Declarative approach (Exercise 1.03)

```sh
$ kubectl apply -f manifests/deployment.yaml
deployment.apps/hashgenerator-movd created
$ kubectl logs -f hashgenerator-movd-69d6d48df6-xrtqr

> 01-hash-generator@1.0.0 start /app
> node index.js

2020-07-09T08:48:27.866Z: 75eab81b-35af-42ec-ae7a-6f8c0eae2923
2020-07-09T08:48:32.872Z: 6d1a02cb-b75a-484c-a9bc-6b574c95d5b3
2020-07-09T08:48:37.874Z: 61488a2d-fcfa-42bc-94d6-f3614665a02e

$ kubectl delete -f manifests/deployment.yaml
```
