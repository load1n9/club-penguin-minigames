import {
    html,
    Component,
    render
} from 'https://unpkg.com/htm/preact/standalone.module.js';

import {
    Dir
} from "./data.js"

class App extends Component {
    render() {
        let output = []
        for (var i = 0; i < Dir.length; i++) {
            output[i] = html `<${El} path=${Dir[i]} />`
        }
        return output

    }
}
var El = ({
    path
}) => html `<a href="${path}">${path}</a><br/>`


render(html `<${App} />`, document.body);