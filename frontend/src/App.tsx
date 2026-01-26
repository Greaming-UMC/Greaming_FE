
import { useState } from "react";
import { Button, Checkbox, SegmentedButton } from "./components/common/input";
import { BaseField, SearchField } from "./components/common/input/InputField";

function App() {
  const [segmentValue, setSegmentValue] = useState("all");
  const [checkedA, setCheckedA] = useState(true);
  const [checkedB, setCheckedB] = useState(false);
  const [baseFixedValue, setBaseFixedValue] = useState("");
  const [baseFillValue, setBaseFillValue] = useState("");
  const [countFixedValue, setCountFixedValue] = useState("");
  const [countFillValue, setCountFillValue] = useState("");
  const [actionFixedValue, setActionFixedValue] = useState("");
  const [actionFillValue, setActionFillValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const variants = [
    "primary",
    "secondary",
    "outlined",
    "outlinedVariant",
    "surface",
    "surfaceVariant",
    "text",
  ] as const;

  const sizes = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const;
  const shapes = ["square", "round"] as const;

  return (
    <div className="min-h-screen bg-surface text-on-surface p-8">
      <div className="mx-auto max-w-5xl space-y-10">
        <section className="space-y-3">
          <h2 className="label-xxxlarge-emphasized">Input Field</h2>
          <div className="space-y-6">
            <div className="space-y-3">
              <BaseField
                headline="Base / fixed"
                value={baseFixedValue}
                onChange={setBaseFixedValue}
                placeholder="기본 입력"
              />
              <div className="w-full max-w-md">
                <BaseField
                  headline="Base / fill"
                  value={baseFillValue}
                  onChange={setBaseFillValue}
                  placeholder="가로 채우기"
                  widthMode="fill"
                />
              </div>
            </div>

            <div className="space-y-3">
              <BaseField
                headline="Count / fixed"
                value={countFixedValue}
                onChange={setCountFixedValue}
                maxLength={20}
                showCounter
                placeholder="카운터"
              />
              <div className="w-full max-w-md">
                <BaseField
                  headline="Count / fill"
                  value={countFillValue}
                  onChange={setCountFillValue}
                  maxLength={20}
                  showCounter
                  placeholder="가로 채우기"
                  widthMode="fill"
                />
              </div>
            </div>

            <div className="space-y-3">
              <BaseField
                headline="Action / fixed"
                value={actionFixedValue}
                onChange={setActionFixedValue}
                placeholder="액션 입력"
                action={{ label: "중복확인", onClick: () => {} }}
              />
              <div className="w-full max-w-md">
                <BaseField
                  headline="Action / fill"
                  value={actionFillValue}
                  onChange={setActionFillValue}
                  placeholder="가로 채우기"
                  action={{ label: "확인", onClick: () => {}, variant: "outlined" }}
                  widthMode="fill"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="label-xxxlarge-emphasized">Search Field</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <SearchField
              value={searchValue}
              onChange={setSearchValue}
              placeholder="검색"
              size="medium"
              iconPosition="leading"
              onSearch={() => {}}
            />
            <SearchField
              value={searchValue}
              onChange={setSearchValue}
              placeholder="검색"
              size="large"
              iconPosition="trailing"
              onSearch={() => {}}
            />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="label-xxxlarge-emphasized">Checkbox</h2>
          <div className="flex flex-wrap gap-[8px] items-center">
            <Checkbox checked={checkedA} onChange={setCheckedA}>
              Default
            </Checkbox>
            <Checkbox checked={checkedB} onChange={setCheckedB} disabled>
              Disabled
            </Checkbox>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="label-xxxlarge-emphasized">Segmented Styles</h2>
          <div className="flex flex-wrap gap-[8px] items-center">
            <SegmentedButton
              variant="primary"
              value={segmentValue}
              options={[
                { label: "All", value: "all" },
                { label: "Bookmarked", value: "bookmarked" },
              ]}
              onChange={setSegmentValue}
            />
            <SegmentedButton
              variant="secondary"
              value={segmentValue}
              options={[
                { label: "All", value: "all" },
                { label: "Bookmarked", value: "bookmarked" },
              ]}
              onChange={setSegmentValue}
            />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="label-xxxlarge-emphasized">Variants</h2>
          <div className="flex flex-wrap gap-4">
            {variants.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="label-xxxlarge-emphasized">Sizes</h2>
          <div className="flex flex-wrap gap-4 items-center">
            {sizes.map((size) => (
              <Button key={size} size={size}>
                {size}
              </Button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="label-xxxlarge-emphasized">Shapes</h2>
          <div className="flex flex-wrap gap-4 items-center">
            {shapes.map((shape) => (
              <Button key={shape} shape={shape}>
                {shape}
              </Button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="label-xxxlarge-emphasized">Icons</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button icon="arrow_left" iconPosition="leading">
              leading
            </Button>
            <Button icon="arrow_right" iconPosition="trailing">
              trailing
            </Button>
            <Button icon="close" aria-label="닫기" />
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            {sizes.map((size) => (
              <Button
                key={`icon-only-${size}`}
                size={size}
                shape="round"
                icon="close"
                aria-label={`닫기 ${size}`}
              />
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="label-xxxlarge-emphasized">Width Mode</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button widthMode="hug">hug</Button>
            <Button widthMode="fixed" width={160}>
              fixed 160
            </Button>
            <div className="w-full max-w-sm">
              <Button widthMode="fill">fill</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
