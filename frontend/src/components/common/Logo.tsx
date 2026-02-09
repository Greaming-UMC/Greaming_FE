import type { ComponentType, SVGProps } from 'react'

// SVG 컴포넌트 타입: <svg>에 넣을 수 있는 모든 props를 그대로 받는 React 컴포넌트.
type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>

// 1) 로고 폴더 안의 SVG를 React 컴포넌트로 한 번에 가져옵니다.
// - import.meta.glob: 파일을 객체로 모음 (키=경로, 값=모듈)
// - eager: true → 빌드 시점에 즉시 import
// - query: '?react' → SVGR로 SVG를 React 컴포넌트로 변환
const logoModules = import.meta.glob('../../assets/logo/*.svg', {
  eager: true,
  import: 'default',
  query: '?react',
})

// 2) 파일명을 여러 표기법으로 변환해 name 매칭을 쉽게 만듭니다.
// 예: mono-white-wordmark.svg → monoWhiteWordmark / mono-white-wordmark / mono_white_wordmark
const toKebab = (name: string) =>
  name
    .replace(/\.svg$/i, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase()

const toCamel = (name: string) => {
  const kebab = toKebab(name)
  return kebab.replace(/-([a-z0-9])/g, (_, char: string) => char.toUpperCase())
}

const toSnake = (name: string) => toKebab(name).replace(/-/g, '_')

// 3) 로고 이름 → SVG 컴포넌트 매핑 테이블을 만듭니다.
//    name으로 어떤 표기법을 넘겨도 찾을 수 있게 별칭을 등록합니다.
const logoMap: Record<string, SvgComponent> = {}
const logoNames = new Set<string>()

Object.entries(logoModules).forEach(([path, component]) => {
  // 경로에서 파일명만 추출 (예: .../primary-wordmark.svg)
  const fileName = path.split('/').pop()
  if (!fileName) return

  const baseName = fileName.replace(/\.svg$/i, '')
  const camel = toCamel(baseName)
  const kebab = toKebab(baseName)
  const snake = toSnake(baseName)

  // 디버그/도움말용으로 대표 이름을 모아둡니다.
  logoNames.add(camel)

  // 동일한 로고를 다양한 이름으로 접근할 수 있게 매핑
  const aliases = new Set([baseName, baseName.toLowerCase(), camel, kebab, snake])
  aliases.forEach((alias) => {
    logoMap[alias] = component as SvgComponent
  })
})

// 사용 가능한 대표 로고 이름 목록(개발 중 확인용).
export const LOGO_NAMES = Array.from(logoNames).sort()

// LogoName은 name에 들어갈 수 있는 문자열 타입입니다(별칭 포함).
export type LogoName = keyof typeof logoMap

// SVGProps<SVGSVGElement>: <svg>에 들어갈 수 있는 표준 속성 타입.
// Omit<..., 'name'>: name은 우리가 따로 받으니 중복 제거합니다.
export type LogoProps = Omit<SVGProps<SVGSVGElement>, 'name'> & {
  name: LogoName
  size?: number | string
  title?: string
}

const Logo = ({ name, size, className, ...rest }: LogoProps) => {
  // 1) name으로 SVG 컴포넌트를 찾습니다.
  const Component = logoMap[name]

  // 2) 없으면 개발 모드에서만 경고를 찍고 렌더를 중단합니다.
  if (!Component) {
    if (import.meta.env.DEV) {
       
      console.warn(`[Logo] Unknown name: "${name}".`, LOGO_NAMES)
    }
    return null
  }

  // 3) 접근성 처리:
  // - aria-label/title이 없으면 "장식용" 로고로 간주
  const ariaLabel = rest['aria-label']
  const isDecorative = !ariaLabel && !rest.title

  // 4) size가 있으면 width/height에 동시에 적용
  //    (워드마크처럼 가로가 긴 로고는 width/height를 직접 넘기는 걸 권장)
  const sizeProps = size ? { width: size, height: size } : {}

  return (
    <Component
      className={className}
      role={isDecorative ? 'presentation' : 'img'}
      aria-hidden={isDecorative}
      focusable="false"
      {...sizeProps}
      {...rest}
    />
  )
}

export default Logo
