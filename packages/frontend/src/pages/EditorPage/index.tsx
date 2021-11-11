import { useState, useCallback } from 'react';

import styled from '@cyfm/styled';

const minWidth = 250;
const controllerWidth = 5;

const FlexWrapper = styled.div`
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
`;

const LeftFlexColumnWrapper = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  flex-basis: ${props => props.width}px;
  min-width: ${minWidth}px;
`;

const RightFlexColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: ${minWidth}px;
`;

const FlexColumnController = styled.div`
  display: inline-block;
  width: ${controllerWidth}px;
  background-color: #999;
  border-color: #444;
  border-style: solid;
  border-top: 2px;
  border-bottom: 2px;
  cursor: col-resize;
`;

interface SlotProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

const EditorPage = (props: SlotProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [leftFlexColumnWidth, setLeftFlexColumnWidth] = useState(
    `${(window.innerWidth - controllerWidth) / 2}`,
  );

  const onControllerMouseDown = useCallback((event: MouseEvent): void => {
    setIsMouseDown(true);
  }, []);

  const onControllerMouseMove = useCallback(
    (event: MouseEvent): void => {
      if (isMouseDown) {
        setLeftFlexColumnWidth(`${event.pageX - controllerWidth / 2}`);
      }
    },
    [isMouseDown],
  );

  const onControllerMouseUp = useCallback((event: MouseEvent): void => {
    setIsMouseDown(false);
  }, []);

  return (
    <>
      <FlexWrapper
        onMouseMove={onControllerMouseMove}
        onMouseUp={onControllerMouseUp}
      >
        <LeftFlexColumnWrapper width={leftFlexColumnWidth}>
          {props.left}
        </LeftFlexColumnWrapper>
        <FlexColumnController onMouseDown={onControllerMouseDown} />
        <RightFlexColumnWrapper width={leftFlexColumnWidth}>
          {props.right}
        </RightFlexColumnWrapper>
      </FlexWrapper>
    </>
  );
};

export default EditorPage;