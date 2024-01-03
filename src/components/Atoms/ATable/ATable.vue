<script setup lang="ts">
import {
	VBtn,
	VIcon,
	VTable
} from 'vuetify/components'

import {
	mdiCommentProcessingOutline,
	mdiDeleteEmpty
} from '@mdi/js'
import { useDateFormat } from '@vueuse/core'

import { LSection } from '../../../components'
import { useWalletStore } from '../../../stores/wallet'
import type { IBalanceItem } from '../../../types/index'

const props = defineProps<{
  data: IBalanceItem[] | []
  title?: string
}>()

const wallerStore = useWalletStore()
</script>

<template>
  <LSection
		:title="title"
		:subtitle="!data.length ? 'Список порожній' : undefined"
	>
		<VTable
      v-if="data.length"
      fixed-header
      rounded
    >
      <thead>
        <tr class="text-sm">
          <th class="text-left">
            Категорія
          </th>
          <th class="text-left">
            Дата
          </th>
          <th class="text-left">
            Сума
          </th>
          <th class="text-left">

          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in data"
          :key="item.date"
          :class="[
            { 'bg-green-darken-4': item.income },
            'text-sm'
          ]"
        >
          <td class="flex-shrink-0"><VIcon :icon="item.icon" /></td>
          <td>
            <div class="inline-flex">
              <span class="flex-shrink-0">
                {{ item.date }}
              </span>
            </div>
          </td>
          <td>
            <div class="inline-flex">
              <span class="flex-shrink-0">
                {{ item.amount }} <small class="opacity-50">UAH</small>
              </span>
            </div>
          </td>
          <td>
            <VTooltip
              v-if="item.comment"
              :text="item.comment"
            >
              <template v-slot:activator="{ props }">
                <VIcon
                  v-bind="props"
                  :icon="mdiCommentProcessingOutline"
                />
              </template>
            </VTooltip>
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
	</LSection>
</template>

<style scoped>

</style>
