import merge from "lodash/merge"

import { Steps } from "./steps/Steps"
import { rtlThemeSupport, themeOverrides } from "./theme"
import { Providers } from "./components/Providers"
import type { RsiProps } from "./types"
import { ModalWrapper } from "./components/ModalWrapper"
import { translations } from "./translationsRSIProps"

export const defaultTheme = themeOverrides

const defaultRSIProps: Partial<RsiProps<any>> = {
  autoMapHeaders: true,
  autoMapSelectValues: false,
  allowInvalidSubmit: true,
  autoMapDistance: 2,
  isNavigationEnabled: false,
  translations: translations,
  uploadStepHook: async (value) => value,
  selectHeaderStepHook: async (headerValues, data) => ({ headerValues, data }),
  matchColumnsStepHook: async (table) => table,
  dateFormat: "yyyy-mm-dd", // ISO 8601,
  parseRaw: true,
} as const

export const ReactSpreadsheetImport = <T extends string>({
  autoMapHeaders = defaultRSIProps.autoMapHeaders,
  autoMapSelectValues = defaultRSIProps.autoMapSelectValues,
  allowInvalidSubmit = defaultRSIProps.allowInvalidSubmit,
  autoMapDistance = defaultRSIProps.autoMapDistance,
  isNavigationEnabled = defaultRSIProps.isNavigationEnabled,
  translations = defaultRSIProps.translations,
  uploadStepHook = defaultRSIProps.uploadStepHook,
  selectHeaderStepHook = defaultRSIProps.selectHeaderStepHook,
  matchColumnsStepHook = defaultRSIProps.matchColumnsStepHook,
  dateFormat = defaultRSIProps.dateFormat,
  parseRaw = defaultRSIProps.parseRaw,
  rtl,
  customTheme,
  isOpen,
  onClose,
  ...props
}: RsiProps<T>) => {
  const mergedTranslations =
    translations !== defaultRSIProps.translations ? merge(translations, defaultRSIProps.translations) : defaultRSIProps.translations
  const mergedThemes = rtl
    ? merge(defaultTheme, rtlThemeSupport, customTheme)
    : merge(defaultTheme, customTheme)

  return (
    <Providers theme={mergedThemes} rsiValues={{ ...props, translations: mergedTranslations }}>
      <ModalWrapper isOpen={isOpen} onClose={onClose}>
        <Steps />
      </ModalWrapper>
    </Providers>
  )
}
