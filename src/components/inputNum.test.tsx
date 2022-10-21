import { fireEvent, render } from "@testing-library/react";
import { InputNum } from './inputNum';

describe("InputNum", () => {
    it('defaultValue should between min and max num', () => {
        const onChange = jest.fn();
        const t = () => {
            const { container } = render(<InputNum defaultValue={-1} onValueChange={onChange} />);
        }
        expect(t).toThrowError()
    })

    it('min should not great than max', () => {
        const onChange = jest.fn();
        const t = () => {
            const { container } = render(<InputNum min={20}  max={1} onValueChange={onChange} />);
        }
        expect(t).toThrowError()
    })

    it('should call onChange correctly when click minus or plus button or change input', () => {
        const onChange = jest.fn();
        const { container } = render(<InputNum defaultValue={10} onValueChange={onChange} />);
        fireEvent.click(container.querySelector('.minus-btn')!);
        expect(onChange).toHaveBeenLastCalledWith( 9);

        fireEvent.click(container.querySelector('.plus-btn')!);
        expect(onChange).toHaveBeenLastCalledWith(10);

        fireEvent.change(container.querySelector('.input')!, {target: {value: '100'}})
        expect(onChange).toHaveBeenLastCalledWith(100)
    });

    it('plus button should disable when current value is max value', () => {
        const onChange = jest.fn();
        const { asFragment } = render(<InputNum max={2} defaultValue={2} onValueChange={onChange}/>);
        expect(asFragment().lastChild).toMatchSnapshot();
    });

    it('minus button should disable when current value is min value', () => {
        const onChange = jest.fn();
        const { asFragment } = render(<InputNum min={0} defaultValue={0} onValueChange={onChange}/>);
        expect(asFragment().firstChild).toMatchSnapshot();
    });


    it('value render should not change by click plus button when current value is max value', () => {
        const onChange = jest.fn();
        const { container } = render(<InputNum max={10} defaultValue={10} onValueChange={onChange} />);
        fireEvent.click(container.querySelector('.plus-btn')!);
        // @ts-ignore
        expect(container.querySelector('.input')!.value).toBe('10')
    });

    it('value render should not change by click min button when current value is min value', () => {
        const onChange = jest.fn();
        const { container } = render(<InputNum min={10} defaultValue={10} onValueChange={onChange} />);
        fireEvent.click(container.querySelector('.minus-btn')!);
        // @ts-ignore
        expect(container.querySelector('.input')!.value).toBe('10')
    });
});
