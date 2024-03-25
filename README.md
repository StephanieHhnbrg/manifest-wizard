# Manifest Wizard

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?color=blue)](./LICENSE)

### Introduction

This tool is a contribution to the annual hackathon from the Green Software
Foundation <a href='https://hack.greensoftware.foundation' target='_blank'>Carbon Hack'24</a>, which is focussing on
the <a href='https://if.greensoftware.foundation' target='_blank'>Impact Framework (IF)</a>

IF is a framework to meassure the environmental impact of software applications.
By setting up a pipeline of plugins and adding time-series observations, a variety of environmental meassurements can be
computed, like carbon emissions or energy consumption.
The core component of the IF is the manifest, which is configuring the pipeline of plugins and defining the observable
timeseries data in a yaml file.

Manifest Wizard is a tool to support the generation of such a manifest file and provides the following features: \
🔸 manifest generation \
🔸 visualization of the configured pipeline \
🔸 upload and download of input data \
🔸 visualization of output data \
🔸 custom creation of charts

### Installation

The tool is deployed on <a href='https://xx' target='_blank'>Github Pages</a>.

But in case you would like to run the project locally, follow these steps:

- Install dependencies: `npm install`
- Start project: `npm run start`

### Basic Tutorial

1. Configure the pipeline \
   ![Tutorial - Step1](.//.github/images/step1.png)

2. Upload your observations \
   ![Tutorial - Step2](.//.github/images/step2.png)

3. Download the manifest file

4. Run IF in your terminal

- `npm install -g @grnsft/if`
- `npm install -g @grnsft/if-plugins`
- `npm install -g @grnsft/if-unofficial-plugins`
- `ie --manifest <path to your manifest file> --output <output-path>`

5. Visualize the output data \
   ![Tutorial - Step5](.//.github/images/step5.png)

