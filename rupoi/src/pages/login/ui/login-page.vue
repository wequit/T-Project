<script setup lang="ts">
import { CommonSignIn } from '@common/widgets'
import {CommonRouteConfig} from "@common/shared/config";
</script>

<template>
  <CommonSignIn
    :to="CommonRouteConfig.Home.path"
  />
</template>
