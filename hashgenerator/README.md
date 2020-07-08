# My Answers for Exercise 1.01: Getting started

Prints a UUID every 5 in an infinite loop. Created with Node.js.

## Container Image

The image is available at Docker hub [movd/devopswithkubernetes-hashgenerator](https://hub.docker.com/r/movd/devopswithkubernetes-hashgenerator).

[![](https://images.microbadger.com/badges/image/movd/devopswithkubernetes-hashgenerator.svg)](https://microbadger.com/images/movd/devopswithkubernetes-hashgenerator "Get your own image badge on microbadger.com")

## Example with kubectl

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