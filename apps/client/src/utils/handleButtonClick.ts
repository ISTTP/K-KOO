import { ButtonType } from '@isttp/types/all';

interface HandleEnterPressProps {
  buttonType: ButtonType;
  submitButton: HTMLButtonElement | null;
}

export function handleButtonClick({
  buttonType,
  submitButton
}: HandleEnterPressProps) {
  const isButtonActive = buttonType === 'default';
  const isButtonRefExist = submitButton;

  const canSubmit = isButtonActive && isButtonRefExist;

  console.log('canSubmit', isButtonActive, isButtonRefExist, canSubmit);
  if (canSubmit) {
    submitButton.click();
  }
}
