
import { useState } from "react";
import { Button, SegmentedButton } from "./components/common/input";

function App() {
  const [segmentValue, setSegmentValue] = useState("all");
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
          <h2 className="label-xxxlarge-emphasized">Segmented Styles</h2>
          <div className="flex flex-wrap gap-[8px] items-center">
            <SegmentedButton
              style="primary"
              value={segmentValue}
              options={[
                { label: "All", value: "all" },
                { label: "Bookmarked", value: "bookmarked" },
              ]}
              onChange={setSegmentValue}
            />
            <SegmentedButton
              style="secondary"
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
