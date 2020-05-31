# Archived

- Making this closed source under a monorepo so that I can iterate rapidly and make breaking changes every second without having to publish a new version

- Once I've stabilized the API and built a reasonable codebase, I plan to update this repo with `v1.0.0`.

---

# Apple Music Web API

A simple SDK to integrate with Apple Music's Web API.

## Why not use MusicKit JS?

MusicKit JS is built for use in an HTML/JS environment - it's an old-fashioned, monolithic framework which bundles all possible music-related APIs together.

It has a consistent interface yet it lacks basic features (caching, retries, ..) & exposes an old-school API (global singleton access, no ES module support). If you want to build a scalable application that integrates with Apple Music, MusicKit JS is not the way to go.

## Vision

The idea behind this SDK is to gracefully take care of behind-the-scenes work (e.g., auth workflows, caching, pagination, retries, etc) - allowing for a simple interface to interact with Apple Music without exposing underlying implementation details.

## Strategy

This is currently an in-development WIP edition, which does practically none of those things, and is only developed according to the needs of my projects. If I need pagination, I'll build pagination - if I need caching, I'll build caching. Etc.

If you want to build those functionalities feel free to submit a pull request.
