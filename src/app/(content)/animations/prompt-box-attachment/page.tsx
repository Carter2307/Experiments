'use client';

import React from 'react';
import assets from './assets';
import { motion } from 'motion/react';
import CraftWithVisualizer from '@/components/templates/CraftWithVisualizer.template';
import { usePathname } from 'next/navigation';
import { useCraft } from '@/hooks/useCraft';

export default function PromptBoxAttachment() {
  const pathname = usePathname();
  const data = useCraft(pathname);

  return (
    <>
      {data ? (
        <CraftWithVisualizer detail={data}>
          <div className="h-full w-full flex items-center justify-center scale-150">
            <PromptBox />
          </div>
        </CraftWithVisualizer>
      ) : null}
    </>
  );
}

interface PromptButtonProps extends React.ComponentProps<'button'> {
  color: string;
  icon: string;
  isPlusIcon?: boolean;
  onClicked?: CallableFunction;
}

enum IconColors {
  Blue = '#1C73FF',
  Green = '#24EC56',
  Pink = '#E45DFF',
  Marine = '#28D6FD',
  Yellow = '#FFE11C',
  Gray = '#EEEEEE',
}

const PromptButtonIcon = (props: PromptButtonProps) => {
  const { color, isPlusIcon = false, icon, onClicked, className } = props;
  const [isRotated, setIsRotated] = React.useState(false);

  return (
    <motion.button
      className={`shrink-0 grow-0 basis-8 h-8 w-8 flex items-center justify-center relative rounded-full overflow-hidden ${className ?? ''}`}
      style={{ background: `${color}` }}
      animate={{ rotate: isRotated ? '45deg' : 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => {
        if (isPlusIcon) {
          setIsRotated(!isRotated);
          onClicked?.(!isRotated);
        }
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assets.TransparentBg.src}
        alt="transparent background"
        className="absolute top-[2px] "
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt="Icon" height={18} width={18} style={{ opacity: 0.6 }} />
    </motion.button>
  );
};

const PromptBox = () => {
  const [isAddBtnClicked, setIsAddBtnClicked] = React.useState(false);

  return (
    <div className=" relative flex flex-row items-center p-[2px] space-x-[5px] h-10 w-60 overflow-hidden rounded-full border border-solid border-gray-200 bg-white">
      <PromptButtonIcon
        color={IconColors.Gray}
        icon={assets.PlusIcon.src}
        isPlusIcon
        onClicked={setIsAddBtnClicked}
        className="z-20"
      />

      <PromptBoxInput animate={isAddBtnClicked} />
      <PromptBoxAction animate={isAddBtnClicked} />
    </div>
  );
};

const PromptBoxInput = ({ animate }: { animate: boolean }) => {
  const placeholder = 'Whats on your mind?';

  return (
    <motion.div
      className="flex flex-row items-center h-8 grow-[1]"
      initial={{ '--blur': '0px', x: 0, opacity: 1 }}
      animate={{
        '--blur': animate ? `10px` : '0px',
        x: animate ? 32 : 0,
        opacity: animate ? 0 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 80,
        damping: 10,
        mass: 1,
      }}
      style={{ filter: `blur(var(--blur))` }}
    >
      <input
        type="text"
        disabled
        className="h-full w-full text-xs bg-transparent placeholder:text-gray-300 font-medium"
        placeholder={placeholder}
      />

      <PromptButtonIcon
        color={IconColors.Blue}
        icon={assets.RightIcon.src}
        onClick={() => console.log('clicked')}
      />
    </motion.div>
  );
};

const PromptBoxAction = ({ animate }: { animate: boolean }) => {
  const buttonIcons = [
    {
      color: IconColors.Yellow,
      icon: assets.FileIcon.src,
    },
    {
      color: IconColors.Green,
      icon: assets.PictureIcon.src,
    },
    {
      color: IconColors.Pink,
      icon: assets.FacetimeIcon.src,
    },
    {
      color: IconColors.Marine,
      icon: assets.ShareDotIcon.src,
    },
  ];
  return (
    <motion.div className="absolute left-8 top-[3px] space-x-[4px] flex flex-row rounded-full z-0">
      {buttonIcons &&
        buttonIcons.map((btn, index) => {
          const i = index == 0 ? 1 : index + 4;
          const distance = 32 * i;
          return (
            <motion.div
              className="flex h-full"
              key={btn.icon}
              initial={{
                x: -distance,
                rotate: '-90deg',
                '--blur': '4px',
                opacity: 0,
              }}
              animate={{
                x: animate ? (distance - 2) / 32 : -distance,
                rotate: animate ? 0 : '-90deg',
                opacity: animate ? 1 : 0,
                '--blur': animate ? '0px' : '4px',

                transition: {
                  default: {
                    type: 'spring',
                    stiffness: 80,
                    damping: 12,
                    duration: 1.8,
                  },
                  '--blur': { delay: 0.1 },
                  rotate: {
                    type: 'spring',
                    stiffness: 80,
                    damping: 12,
                    duration: 2,
                    delay: 0.1,
                  },
                },
              }}
              style={{ filter: 'blur(var(--blur))' }}
            >
              <PromptButtonIcon color={btn.color} icon={btn.icon} />
            </motion.div>
          );
        })}
    </motion.div>
  );
};
