<script setup lang="ts">
import {
	VBtn,
	VIcon,
	VTable
} from 'vuetify/components'

import {
	mdiDeleteEmpty
} from '@mdi/js'

import { useWalletStore } from '../../stores/wallet'
const wallerStore = useWalletStore()
</script>

<template>
  <VTable
    v-if="wallerStore.balance.length"
    fixed-header
    rounded
  >
    <thead>
      <tr class="text-sm">
        <th class="text-left">
          Category
        </th>
        <th class="text-left">
          Date
        </th>
        <th class="text-left">
          Amount
        </th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in wallerStore.balance"
        :key="item.date"
        :class="[
          { 'bg-green-darken-4': item.income },
          'text-sm'
        ]"
      >
        <td class="flex-shrink-0"><VIcon :icon="item.type.icon" /></td>
        <td>
          <div class="inline-flex">
            <span class="flex-shrink-0">{{ item.date }}</span>
          </div>
        </td>
        <td>
          <div class="inline-flex">
            <span class="flex-shrink-0">
              {{ item.amount }} <small class="opacity-50">UAH</small>
            </span>
          </div>
        </td>
        <td class="text-right">
          <VBtn
            variant="text"
            @click="wallerStore.removeBalance(item.id)"
          >
            <VIcon
              color="red"
              :icon="mdiDeleteEmpty"
            />
          </VBtn>
        </td>
      </tr>
    </tbody>
  </VTable>
  <div
    v-if="!wallerStore.balance.length"
    class="text-center py-10"
  >List is empty</div>
</template>

<style scoped>

</style>
