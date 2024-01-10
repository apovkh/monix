<script setup lang="ts">
import {
	ABlur,
	LFooter,
	LHeader,
	LMain,
	ODrawerFilter,
	ODrawerMenu
} from '../components'

import { useDefaultLayoutData } from './handlers'

// eslint-disable-next-line @typescript-eslint/typedef
const {
	amount,
	viewData,
	viewDataType,
	isErrorAmount,
	isOpenMenuDrawer,
	formatedBalance,
	isOpenFiltersDrawer,
	headerMenuClick: onHeaderMenuClick,
	filterMenuClick: onFilterMenuClick,
	addIncome: onClickIncome,
	addCost: onClickAddCost,
	changeView: onClickMenuView
} = useDefaultLayoutData()
</script>

<template>
  <div class="t-overlay" />
  <div class="l-wrapper">
    <LHeader
      :balance="formatedBalance"
      @click-menu="onHeaderMenuClick"
      @click-filter="onFilterMenuClick"
    />
    <LMain>
      <ABlur
        radius-size="xl"
        background="dark"
        class="h-full"
      >
        <slot />
      </ABlur>
    </LMain>

    <LFooter
      v-model:amount="amount"
      :is-error-amount="isErrorAmount"
      @click-cost="onClickAddCost"
      @click-income="onClickIncome"
    />
  </div>

  <ODrawerMenu
    v-model="isOpenMenuDrawer"
    :data="viewData"
    :view="viewDataType"
    @click-view="onClickMenuView"
  />
  <ODrawerFilter v-model="isOpenFiltersDrawer" />
</template>

<style lang="scss">
  .t-overlay {
    @apply
      absolute
      inset-0
      overflow-hidden
      pointer-events-none
      -z-1
    ;

    &::before,
    &::after {
      content: '';
      @apply
        fixed
        w-[40vw]
        h-[40vw]
        -z-1
        pointer-events-none
        rounded-bl-[5vw]

      ;
      filter: blur(100px);
    }

    &::before {
      background-color: #E7B262;
      @apply
        top-0
        left-0
        rounded-tr-[5vw]
        ;
      }

      &::after {
        background-color: #88B4B3;
        @apply
        bottom-0
        right-0
        rounded-bt-[5vw]
      ;
    }
  }
  .l-wrapper {
    @apply
      grid
      grid-cols-[100%]
      min-h-[100vh]
    ;

    grid-template-rows: auto 1fr auto;
  }
</style>
